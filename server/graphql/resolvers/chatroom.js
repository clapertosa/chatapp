const knex = require("../../db/knex");
const bcrypt = require("bcryptjs");
const { isLength, isEmpty, isLowercase } = require("validator");

module.exports = {
  createChatroom: async ({ chatroomInput: { name } }, { req }) => {
    if (!req.session.isLoggedIn) {
      throw new Error("Unauthorized");
    } else if (!req.session.user.activated) {
      throw new Error("You must activate your account!");
    }

    const chatroom = await knex("chatrooms")
      .first()
      .where({ name });

    if (chatroom) {
      throw new Error("Chatroom name not available");
    }

    //* Check fields
    // Check name
    if (isEmpty(name, { ignore_whitespace: true })) {
      throw new Error("Name is required");
    } else if (!isLowercase(name)) {
      throw new Error("Name must be lowercase");
    } else if (!isLength(name, { min: 3, max: 20 })) {
      throw new Error("Chatroom name must be between 3 and 20 chars");
    } else if (name.includes(" ")) {
      throw new Error("White spaces not allowed");
    }

    //* Create a chatroom
    const res = await knex("chatrooms")
      .insert({
        name,
        admin_id: req.session.user.id
      })
      .returning([
        "id",
        "name",
        "protected",
        "admin_id",
        "created_at",
        "updated_at"
      ]);

    //* Set user as the Admin of this chatroom
    await knex("permissions").insert({
      user_id: req.session.user.id,
      chatroom_id: res[0].id,
      type: "ADMIN"
    });

    return true;
  },
  joinChatroom: async ({ name }, { req, res }) => {
    if (!req.session.isLoggedIn) {
      return null;
    } else if (!req.session.user.activated) {
      throw new Error("You must activate your account!");
    }

    //* Check if chatroom exists
    const chatroom = await knex("chatrooms")
      .first()
      .where({ name });

    if (!chatroom) {
      throw new Error("Chatroom not found");
    }

    if (chatroom.protected) {
      const userPermitted = await knex("permissions")
        .first()
        .where({ chatroom_id: chatroom.id, user_id: req.session.user.id });

      if (!userPermitted) {
        throw new Error("Unauthorized");
      }
    }

    return "Joined";
  },
  checkPermission: async ({ id }, { req }) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    const userIsPermitted = await knex("permissions")
      .first()
      .where({ chatroom_id: id, user_id: req.session.user.id });

    if (!userIsPermitted) {
      throw new Error("Unauthorized");
    }

    return true;
  },
  grantPermission: async ({ name, password }, { req }) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    //* Check if chatroom exists
    const chatroom = await knex("chatrooms")
      .first()
      .where({ name });

    if (!chatroom) {
      throw new Error("Chatroom not exists");
    }

    //* Check if logged user has already access to chatroom
    const userIsPermitted = await knex("permissions")
      .first()
      .where({ user_id: req.session.user.id, chatroom_id: chatroom.id });

    if (userIsPermitted) {
      throw new Error("User already permitted");
    }

    //* Check if provided password is correct
    const passwordMatch = await bcrypt.compare(password, chatroom.password);

    if (!passwordMatch) {
      throw new Error("Password wrong");
    }

    //* Insert user in the permitted chatroom list;
    await knex("permissions").insert({
      user_id: req.session.user.id,
      chatroom_id: chatroom.id,
      type: "USER"
    });

    return true;
  },
  currentChatroom: async ({ name }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    //* Check if chatroom exists
    const chatroom = await knex("chatrooms")
      .first()
      .where({ name });

    if (!chatroom) {
      throw new Error("Chatroom not found");
    }

    //* Check if chatroom is protected and if user can access it
    let permissions;
    if (chatroom.protected) {
      permissions = await knex("chatrooms").innerJoin(
        "permissions",
        "permissions.chatroom_id",
        "chatrooms.id"
      );

      const hasUserPermission = permissions.filter(
        permission => permission.user_id === req.session.user.id
      );

      if (!hasUserPermission) {
        throw new Error("User not permitted");
      }
    }

    //* Get all messages
    let messages = await knex("messages")
      .innerJoin("users", "messages.user_id", "users.id")
      .where("messages.chatroom_id", chatroom.id)
      .select(
        "messages.id",
        "messages.user_id",
        "messages.message",
        "messages.created_at",
        "users.nickname",
        "users.avatar"
      )
      .orderBy("created_at", "ASC")
      .limit(50);

    //* Convert timestamps to ISO Strings
    messages = messages.map(
      message =>
        (message = { ...message, created_at: message.created_at.toISOString() })
    );

    return {
      id: chatroom.id,
      name: chatroom.name,
      admin_id: chatroom.admin_id,
      protected: chatroom.protected,
      messages,
      created_at: chatroom.created_at.toISOString(),
      updated_at: chatroom.updated_at.toISOString()
    };
  },

  createMessage: async ({ chatroomId, userId, message }, { req }) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    //* Check if chatroom exists
    const chatroom = await knex("chatrooms")
      .first()
      .where({ id: chatroomId });

    if (!chatroom) {
      throw new Error("Chatroom not found");
    }

    //* Check if chatroom is protected and if user can access it
    let permissions;
    if (chatroom.protected) {
      permissions = await knex("chatrooms").innerJoin(
        "permissions",
        "permissions.chatroom_id",
        "chatrooms.id"
      );

      const hasUserPermission = permissions.filter(
        permission => permission.user_id === req.session.user.id
      );

      if (!hasUserPermission) {
        throw new Error("User not permitted");
      }
    }

    //* If messages in this chatroom are more than 100, I'll delete the oldest one
    const messagesLength = await knex("messages")
      .where({ chatroom_id: chatroomId })
      .count()
      .first();

    if (messagesLength.count >= 50) {
      await knex.raw(
        `DELETE FROM messages WHERE id IN (SELECT id FROM messages ORDER BY created_at LIMIT 1);`
      );
    }

    //* Insert new message
    await knex("messages").insert({
      chatroom_id: chatroomId,
      user_id: userId,
      message
    });

    return true;
  },
  changeChatroomPassword: async (
    { id, password, confirmPassword },
    { req }
  ) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    //* Check if chatroom exists and if admin_id equals to current session user id
    const chatroom = await knex("chatrooms")
      .first()
      .where({ id });

    if (!chatroom) {
      throw new Error("Chatroom not found");
    }

    if (chatroom.admin_id !== req.session.user.id) {
      throw new Error("Unauthorized");
    }

    //* Check if passwords are valid
    if (isEmpty(password, { ignore_whitespace: true })) {
      throw new Error("Password required");
    } else if (password.includes(" ")) {
      throw new Error("White spaces not allowed");
    } else if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }

    //* Encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    //* Change chatroom password
    await knex("chatrooms")
      .update({
        password: hashedPassword,
        protected: true
      })
      .where({ id });
  },
  removePassword: async ({ id }, { req }) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    const chatroom = await knex("chatrooms")
      .first()
      .where({ id });

    //* Check if chatroom is protected
    if (!chatroom.protected) {
      throw new Error("No password was set");
    }

    //* Check if the authenticated user has created this chatroom
    if (chatroom.admin_id !== req.session.user.id) {
      throw new Error("Unauthorized");
    }

    //* Remove password from chatroom
    await knex("chatrooms")
      .update({ password: null, protected: false })
      .where({ id });

    return true;
  },
  deleteChatroom: async ({ id }, { req }) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    const chatroom = await knex("chatrooms")
      .first()
      .where({ id });

    //* Check if the authenticated user has created this chatroom
    if (chatroom.admin_id !== req.session.user.id) {
      throw new Error("Unauthorized");
    }

    //* Delete chatroom and messages (with foreign key in messages table on chatroom_id)
    await knex("chatrooms")
      .where({ id })
      .del();

    return true;
  }
};
