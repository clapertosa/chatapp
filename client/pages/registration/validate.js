import Router from "next/router";
import gql from "graphql-tag";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin: auto;
`;

const ACTIVATE_USER_MUTATION = gql`
  mutation ACTIVATE_USER_MUTATION($token: String!) {
    activateUser(token: $token)
  }
`;

const Validate = ({ error, success }) => {
  if (success) {
    process.browser
      ? setTimeout(() => {
          Router.replace("/login");
        }, 3000)
      : null;
    return (
      <Container>
        <Jumbotron fadeInTime="2s">
          <h1>Account successfully activated.</h1>
          <h2>You will now be redirected to Login page.</h2>
        </Jumbotron>
      </Container>
    );
  } else if (error === "jwt expired") {
    return (
      <Container>
        <Jumbotron>
          <h1>Token expired. A new email has been sent.</h1>
        </Jumbotron>
      </Container>
    );
  } else if (error === "Your account is already activated") {
    process.browser
      ? setTimeout(() => {
          Router.replace("/");
        }, 3000)
      : null;
    return (
      <Container>
        <Jumbotron>
          <h1>Your account is already activated.</h1>
          <h2>You will now be redirected to index page.</h2>
        </Jumbotron>
      </Container>
    );
  }
  return (
    <Container>
      <Jumbotron>
        <h1>Invalid token.</h1>
      </Jumbotron>
    </Container>
  );
};

Validate.getInitialProps = async ({ apolloClient, query }) => {
  let error;
  let res;

  try {
    res = await apolloClient.mutate({
      mutation: ACTIVATE_USER_MUTATION,
      variables: { token: query.token }
    });
  } catch (err) {
    error =
      err.graphQLErrors && err.graphQLErrors.error
        ? err.graphQLErrors[0].error.message
        : err;
  }
  return { error, success: res };
};

export default Validate;
