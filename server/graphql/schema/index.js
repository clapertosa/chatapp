const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # User
  type User {
    id: ID!
    nickname: String!
    email: String!
    avatar: String
    activated: Boolean!
    reset_token: String
    reset_token_expiration: String
    created_at: String!
    updated_at: String!
  }

    type AuthData {
    id: ID!
    nickname: String!
    email: String!
    avatar: String
    activated: Boolean!
  }

  input UserInput {
    nickname: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  # Chatroom
  type Chatroom {
    id: ID!
    name: String!
    protected: Boolean!
    admin_id: ID
    messages: [Message!]
    permissions: [Permission!]
    created_at: String!
    updated_at: String!
  }

  input ChatroomInput {
    name: String!
    #password: String
  }

  # Message
  type Message {
    id : ID!
    user_id: ID!
    message: String!
    nickname: String!
    avatar: String!
    created_at: String!
  }

  # Permission
  type Permission {
    id: ID!
    user_id: ID!
    type: String
  }

  # Configuration
  # Root Query
  type RootQuery {
    #User
    currentUser: AuthData

    #Chatroom
    joinChatroom(name: String!): String
    currentChatroom(name: String!): Chatroom
    getAllChatrooms: [Chatroom!]
    checkPermission(id: ID!): Boolean!
  }

  #Root Mutation
  type RootMutation {
    #User
    createUser(userInput: UserInput): User
    activateUser(token: String!): String
    login(email: String! password: String!): User!
    logout: String
    newPassword(email: String!): String
    resetPassword(newPassword: String! confirmNewPassword: String!, token: String!): String

    #Chatroom
    createChatroom(chatroomInput: ChatroomInput): Chatroom
    createMessage(chatroomId: ID! userId: ID!, message: String!): Boolean!
    grantPermission(name: String! password: String): Boolean
    changeChatroomPassword(id: ID!, password: String! confirmPassword: String!): Boolean
    removePassword(id: ID!): Boolean
    deleteChatroom(id: ID!): Boolean
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
