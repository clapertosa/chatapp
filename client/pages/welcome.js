import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Link from "../components/styles/Link";

class Welcome extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <Jumbotron fadeInTime="2.3s" width="70%">
          <h1>Welcome to Chat App</h1>
          <img
            width="100px"
            src="/static/images/logo.svg"
            alt="Chat App balloon logo"
          />
          <h1>
            Please <Link href="/login">Login</Link> to join or create chatroom
          </h1>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;
