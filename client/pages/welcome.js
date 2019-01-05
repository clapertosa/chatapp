import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import StyledLink from "../components/styles/StyledLink";

class Welcome extends Component {
  render() {
    return (
      <div>
        <Jumbotron fadeInTime="2.3s" width="70%">
          <h1>Welcome to Chat App</h1>
          <img
            width="100px"
            src="/static/images/logo.svg"
            alt="Chat App balloon logo"
          />
          <hr />
          <h1>
            Please <StyledLink href="/login">Login</StyledLink> to join or
            create chatroom
          </h1>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;
