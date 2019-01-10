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

  # Configuration
  # Root Query
  type RootQuery {
    currentUser: AuthData
  }

  #Root Mutation
  type RootMutation {
    createUser(userInput: UserInput): User
    activateUser(token: String!): String
    login(email: String! password: String!): User!
    logout: String
    newPassword(email: String!): String
    resetPassword(newPassword: String! confirmNewPassword: String!, token: String!): String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
