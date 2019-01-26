import gql from "graphql-tag";

const CURRENT_CHATROOM_QUERY = gql`
  query CURRENT_CHATROOM_QUERY($name: String!) {
    currentChatroom(name: $name) {
      id
      name
      protected
      admin_id
      messages {
        id
        message
        user_id
        nickname
        avatar
        created_at
      }
      created_at
      updated_at
    }
  }
`;

export { CURRENT_CHATROOM_QUERY };
export default (apolloClient, name) =>
  apolloClient
    .query({ query: CURRENT_CHATROOM_QUERY, variables: { name } })
    .then(({ data }) => {
      return { chatroom: data };
    })
    .catch(() => {
      return { chatroom: {} };
    });
