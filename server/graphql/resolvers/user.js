const knex = require("../../db/knex");
const bcrypt = require("bcryptjs");
const { isEmpty, isLength, normalizeEmail, isEmail } = require("validator");

module.exports = {
  changeAvatar: async ({ path }, { req }) => {
    if (!req.session.isLoggedIn) {
      return false;
    }

    //* Update user avatar in DB and in session
    await knex("users")
      .update({ avatar: path })
      .where({ id: req.session.user.id });
    req.session.user.avatar = path;

    return true;
  },
  changeNickname: async ({ nickname }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    //* Check nickname
    if (isEmpty(nickname, { ignore_whitespace: true })) {
      throw new Error("Nickname required");
    } else if (!isLength(nickname, { min: 4, max: 16 })) {
      throw new Error("Nickname must be between 4 and 16 chars");
    } else if (nickname !== nickname.toLowerCase()) {
      throw new Error("Nickname must be lowercase");
    } else if (nickname.includes(" ")) {
      throw new Error("White spaces not allowed");
    }

    //* Check if the nickname is already in use
    const nicknameExists = await knex("users")
      .first()
      .where({ nickname });

    if (nicknameExists) {
      throw new Error("Nickname already in use");
    }

    //* Update user nickname in DB and in session
    await knex("users")
      .update({ nickname })
      .where({ id: req.session.user.id });
    req.session.user.nickname = nickname;

    return true;
  },
  changeEmail: async ({ email, confirmEmail }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    //* Check email
    if (isEmpty(email, { ignore_whitespace: true })) {
      throw new Error("Email required");
    } else if (!isEmail(email)) {
      throw new Error("Email not valid");
    }

    //* Check email confirm
    if (isEmpty(confirmEmail, { ignore_whitespace: true })) {
      throw new Error("Confirm email required");
    } else if (normalizeEmail(email) !== normalizeEmail(confirmEmail)) {
      throw new Error("Emails don't match");
    }

    //* Check if email already exists
    const emailExists = await knex("users")
      .first()
      .where({ email });

    if (emailExists) {
      throw new Error("Email already in use");
    }

    //* Update user email in DB and in session
    await knex("users")
      .update({ email })
      .where({ id: req.session.user.id });
    req.session.user.email = email;

    return true;
  },
  changePassword: async ({ password, confirmPassword }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    //* Check password
    if (isEmpty(password, { ignore_whitespace: true })) {
      throw new Error("Password required");
    } else if (password.includes(" ")) {
      throw new Error("White spaces not allowed");
    } else if (!isLength(password, { min: 8, max: 16 })) {
      throw new Error("Password must be between 8 and 16 chars");
    }

    //* Check password confirm
    if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }

    //* Encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    //* Update user password in DB
    await knex("users")
      .update({ password: hashedPassword })
      .where({ id: req.session.user.id });

    return true;
  },
  getMyChatrooms: async ({ args }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    let chatrooms = await knex("chatrooms")
      .where({
        admin_id: req.session.user.id
      })
      .orderBy("created_at", "DESC");

    chatrooms = chatrooms.map(chatroom => {
      return { ...chatroom, created_at: chatroom.created_at.toISOString() };
    });

    return chatrooms;
  },
  getWrittenInChatrooms: async ({ args }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    let chatrooms = await knex.raw(`SELECT DISTINCT ON (chatroom_id) chatroom_id,
    user_id, messages.created_at, chatrooms.id, name, protected
    FROM messages
    INNER JOIN chatrooms ON messages.chatroom_id = chatrooms.id
    WHERE user_id = ${req.session.user.id}
    LIMIT 11`);

    chatrooms = chatrooms.rows.map(chatroom => {
      return { ...chatroom, created_at: chatroom.created_at.toISOString() };
    });

    return chatrooms;
  }
};
