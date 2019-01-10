import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../hoc/User/User";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`;

const Logout = () => {
  return null;
};

Logout.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/welcome");
  }

  await context.apolloClient.mutate({
    mutation: LOGOUT_MUTATION,
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  await redirect(context, "/welcome");

  return {};
};

export default Logout;
