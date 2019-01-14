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
      created_at: res[0].created_at,
      updated_at: res[0].updated_at
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

    return {
      id: chatroom.id,
      name: chatroom.name,
      admin_id: chatroom.admin_id,
      protected: chatroom.protected,
      created_at: chatroom.created_at,
      updated_at: chatroom.updated_at
    };
  }
};
