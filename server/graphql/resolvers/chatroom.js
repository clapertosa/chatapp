const knex = require("../../db/knex");
const { isLength, isEmpty, isLowercase } = require("validator");

module.exports = {
  createChatroom: async ({ chatroomInput: { name } }, { req }) => {
    if (!req.session.isLoggedIn) {
      throw new Error("Unauthorized");
    }

    const chatroomExists = await knex("chatrooms")
      .first()
      .where({ name });

    if (chatroomExists) {
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

    return {
      id: res[0].id,
      name: res[0].name,
      protected: res[0].protected,
      admin_id: res[0].admin_id,
      created_at: res[0].created_at.toISOString(),
      updated_at: res[0].updated_at.toISOString()
    };
  },
  joinChatroom: async ({ name }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    //* Check if chatroom exists
    const chatroomExists = await knex("chatrooms")
      .first()
      .where({ name });

    if (!chatroomExists) {
      throw new Error("Chatroom not found");
    }
    return "Joined";
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
      .orderBy("created_at", "DESC")
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
  }
};
