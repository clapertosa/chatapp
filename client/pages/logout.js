import React, { Component } from "react";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../hoc/User/User";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`;

class Logout extends Component {
  static async getInitialProps(context) {
    const { user } = await checkLoggedIn(context.apolloClient);

    if (!user.currentUser) {
      redirect(context, "/welcome");
      return {};
    }

    await context.apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    await context.apolloClient.cache.reset();

    redirect(context, "/welcome");

    return {};
  }

  render() {
    return null;
  }
}

export default Logout;
