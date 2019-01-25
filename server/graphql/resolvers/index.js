const authResolver = require("./auth");
const chatroomResolver = require("./chatroom");
const userResolver = require("./user");

const rootResolver = {
  ...authResolver,
  ...chatroomResolver,
  ...userResolver
};

module.exports = rootResolver;
