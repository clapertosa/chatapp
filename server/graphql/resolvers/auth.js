const knex = require("../../db/knex");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");
const keys = require("../../config/keys");
const { isEmail, isEmpty, normalizeEmail, isLength } = require("validator");

module.exports = {
  createUser: async ({ userInput }, { req }) => {
    //* Check if email or nickname are already in use
    const userExists = await knex("users")
      .first()
      .where({ email: userInput.email })
      .orWhere({ nickname: userInput.nickname })
      .select("email", "nickname");

    if (userExists && userExists.nickname === userInput.nickname) {
      const error = new Error("Nickname already in use");
      error.type = "nickname";
      throw error;
    } else if (userExists && userExists.email === userInput.email) {
      const error = new Error("Email already in use");
      error.type = "email";
      throw error;
    }

    //* Check userInput's values
    // Nickname
    if (isEmpty(userInput.nickname, { ignore_whitespace: true })) {
      throw new Error("Nickname is required");
    } else if (userInput.nickname.includes(" ")) {
      throw new Error("White spaces are not allowed");
    } else if (!isLength(userInput.nickname, { min: 4, max: 16 })) {
      throw new Error("Nickname must be between 4 and 16 chars");
    } else if (userInput.nickname.toLowerCase() !== userInput.nickname) {
      throw new Error("Nickname must be lowercase");
    }
    // Email
    if (isEmpty(userInput.email, { ignore_whitespace: true })) {
      throw new Error("Email is required");
    } else if (!isEmail(userInput.email)) {
      throw new Error("Invalid email address");
    }
    // Password
    if (isEmpty(userInput.password, { ignore_whitespace: true })) {
      throw new Error("Password is required");
    } else if (userInput.password.includes(" ")) {
      throw new Error("White spaces are not allowed");
    } else if (!isLength(userInput.password, { min: 8, max: 16 })) {
      throw new Error("Password must be between 8 and 16 chars");
    }
    // Confirm Password
    if (isEmpty(userInput.confirmPassword, { ignore_whitespace: true })) {
      throw new Error("Confirm Password is required");
    } else if (userInput.password !== userInput.confirmPassword) {
      throw new Error("Passwords don't match");
    }

    //* Register new user
    // Crypt password
    const hashedPassword = await bcrypt.hash(userInput.password, 12);

    // Insert user in the DB
    const res = await knex("users")
      .insert({
        nickname: userInput.nickname,
        email: normalizeEmail(userInput.email),
        password: hashedPassword
      })
      .returning(["id", "nickname", "email"]);

    // Create token for account activation
    const token = await jwt.sign(
      {
        id: res[0].id,
        email: normalizeEmail(userInput.email),
        nickname: userInput.nickname
      },
      keys.JWT,
      { expiresIn: "24hr" }
    );

    // Send the email with activation token
    await sendEmail(
      normalizeEmail(userInput.email),
      "chat-app@no-reply.com",
      "🍹 Chat-App - Account Activation",
      "Welcome to Chat-App! Please activate your account clicking on Activate button:",
      "registration/validate",
      token,
      req
    );

    return { id: res[0].id, nickname: res[0].nickname, email: res[0].email };
  },
  activateUser: async ({ token }, { req }) => {
    //* Decode JWT
    let decodedUser;
    try {
      decodedUser = await jwt.decode(token);
    } catch (err) {
      throw err.message;
    }

    //* Check if the account has already been activated
    const user = await knex("users")
      .first()
      .where({ id: decodedUser.id })
      .select("activated");
    if (user.activated) {
      throw new Error("Your account is already activated");
    }

    //* Check if token is valid
    // 'invalid signature' or 'jwt expired'
    try {
      await jwt.verify(token, keys.JWT);
    } catch (err) {
      if (err.message === "jwt expired") {
        const decodedUser = await jwt.decode(token);
        const newToken = jwt.sign(
          {
            id: decodedUser.id,
            email: decodedUser.email,
            nickname: decodedUser.nickname
          },
          keys.JWT,
          { expiresIn: "24hr" }
        );
        sendEmail(
          decodedUser.email,
          "chat-app@no-reply.com",
          "🍹 Chat-App - Account Activation",
          "Please activate your account clicking on Activate button:",
          "registration/validate",
          newToken,
          req
        );
      }
      throw err.message;
    }

    //* Activate the user in DB and in session
    await knex("users")
      .update({ activated: true })
      .where({ id: decodedUser.id });
    req.session.user.activated = true;

    return "Activated";
  },
  login: async ({ email, password }, { req }) => {
    //* Check if user exists
    const user = await knex("users")
      .first()
      .where({ email });
    if (!user) {
      throw new Error("Email or password wrong");
    }

    //* Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password wrong");
    }

    //* Create a new session
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      avatar: user.avatar,
      activated: user.activated
    };

    return { id: user.id };
  },
  currentUser: async (args, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }
    const user = await knex("users")
      .first()
      .select("id", "nickname", "email", "activated", "avatar")
      .where({ id: req.session.user.id });

    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      activated: user.activated,
      avatar: user.avatar
    };
  },
  logout: async (args, { res, req }) => {
    res.clearCookie("qob");
    req.session.destroy();

    return "Goodbye!";
  },
  newPassword: async ({ email }, { req }) => {
    //* Check if user exists
    const user = await knex("users")
      .first()
      .where({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    //* Create a token for the user in DB
    const asyncCrypto = promisify(crypto.randomBytes);
    const token = await asyncCrypto(32);

    await knex("users")
      .where({ email })
      .update({
        reset_token: token.toString("hex"),
        reset_token_expiration: new Date(Date.now() + 7200000) // 2hr
      });

    //* Send an email with token
    await sendEmail(
      email,
      "chat-app@no-reply.com",
      "🍹 Chat-App - Password Reset",
      "Please click on the button to start the reset password process:",
      "login/password-reset",
      token.toString("hex"),
      req
    );

    return "Token created";
  },
  resetPassword: async ({ newPassword, confirmNewPassword, token }) => {
    //* Check if a user has the provided token
    const user = await knex("users")
      .first()
      .where({ reset_token: token });

    //* Check if token has expired
    if (!user) {
      throw new Error("Invalid token");
    } else if (user.reset_token_expiration < new Date(Date.now())) {
      throw new Error("Token expired");
    }

    //* Check if passwords are valid
    if (isEmpty(newPassword, { ignore_whitespace: true })) {
      throw new Error("New password is required");
    } else if (!isLength(newPassword, { min: 8, max: 16 })) {
      throw new Error("Password must be between 8 and 16 chars");
    } else if (newPassword.includes(" ")) {
      throw new Error("White spaces are not allowed");
    } else if (newPassword !== confirmNewPassword) {
      throw new Error("Passwords don't match");
    }

    //* Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    //* Update user password in DB
    await knex("users")
      .where({ reset_token: token })
      .update({
        password: hashedPassword,
        reset_token: null,
        reset_token_expiration: null
      });

    return "Password changed";
  }
};
