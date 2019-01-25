import React, { Component } from "react";
import styled from "styled-components";
import FormSelector from "./Form/FormSelector";
import Avatar from "./Form/Avatar";
import Nickname from "./Form/Nickname";
import Email from "./Form/Email";
import Password from "./Form/Password";

const Container = styled.div`
  margin-top: 10px;
`;

class Profile extends Component {
  state = {
    selectedTab: "avatar"
  };

  onTabClickHandler = e => {
    this.setState({ selectedTab: e.target.getAttribute("name") });
  };

  render() {
    return (
      <Container>
        <FormSelector
          onTabClickHandler={this.onTabClickHandler}
          selected={this.state.selectedTab}
        >
          <Avatar show={this.state.selectedTab === "avatar"} />
          <Nickname show={this.state.selectedTab === "nickname"} />
          <Email show={this.state.selectedTab === "email"} />
          <Password show={this.state.selectedTab === "password"} />
        </FormSelector>
      </Container>
    );
  }
}

export default Profile;
