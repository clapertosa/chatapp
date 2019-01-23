import gql from "graphql-tag";

const CHECK_PERMISSION_QUERY = gql`
  query CHECK_PERMISSION_QUERY($id: ID!) {
    checkPermission(id: $id)
  }
`;

export default (apolloClient, chatroomId) =>
  apolloClient
    .query({
      query: CHECK_PERMISSION_QUERY,
      variables: { id: chatroomId }
    })
    .then(({ data }) => {
      return { permission: data };
    })
    .catch(e => {
      return { permission: {} };
    });
