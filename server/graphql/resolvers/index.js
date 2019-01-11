const authResolver = require("./auth");
const chatroomResolver = require("./chatroom");

const rootResolver = {
  ...authResolver,
  ...chatroomResolver
};

module.exports = rootResolver;
