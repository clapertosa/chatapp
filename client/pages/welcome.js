import React, { Component } from "react";
import Head from "next/head";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import StyledLink from "../components/styles/StyledLink";

class Welcome extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Chat App 🎈 | Welcome</title>
        </Head>
        <Jumbotron fadeInTime="2.3s" width="70%">
          <h1>Welcome to Chat App</h1>
          <img
            width="100px"
            height="auto"
            src="/static/images/logo.svg"
            alt="Chat App balloon logo"
          />
          <hr />
          <h1>
            Please <StyledLink href="/login">login</StyledLink> or{" "}
            <StyledLink href="/registration">register</StyledLink> to
            join/create chatrooms
          </h1>
        </Jumbotron>
      </div>
    );
  }
}

Welcome.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);
  if (user.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default Welcome;
