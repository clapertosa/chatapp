import React, { Component } from "react";
import styled from "styled-components";
import ChatroomHeader from "./ChatroomHeader";
import ChatroomMessages from "./ChatroomMessages/ChatroomMessages";
import ChatroomUsers from "./ChatroomUsers/ChatroomUsers";
import ChatroomInput from "./ChatroomInput";
import Backdrop from "../UI/Backdrop/Backdrop";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.navbarHeight});
  display: grid;
  grid-template-areas: "header" "messages" "input";
  grid-template-rows: auto 1fr auto;

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    display: grid;
    grid-template-areas: "header header" "users messages" "users input";
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: auto 1fr auto;
    border: 2px solid ${({ theme: { colors } }) => colors.strongPink};
    border-radius: 10px;
    width: 95%;
    height: calc(100vh - (${({ theme }) => theme.navbarHeight} + 2rem));
    max-width: 1350px;
    margin: 10px auto;
    overflow: hidden;
  }
`;

class ChatroomContainer extends Component {
  state = {
    showUsers: false
  };

  showUsersDrawerToggle = () => {
    this.setState(prevState => {
      return { showUsers: !prevState.showUsers };
    });
  };

  closeSideDrawer = () => {
    this.setState({ showUsers: false });
  };

  render() {
    return (
      <Container>
        <ChatroomHeader
          showUsersDrawerToggle={this.showUsersDrawerToggle}
          name={this.props.chatroom.name}
        />
        <ChatroomUsers
          show={this.state.showUsers}
          closeSideDrawer={this.closeSideDrawer}
          users={this.props.users}
        />
        <ChatroomMessages
          userId={this.props.user.id}
          messages={this.props.messages}
        />
        <ChatroomInput
          chatroomId={this.props.chatroom.id}
          user={this.props.user}
        />
        <Backdrop
          showBackdrop={this.state.showUsers}
          closeSideDrawer={this.closeSideDrawer}
          zIndex={10}
        />
      </Container>
    );
  }
}

export default ChatroomContainer;
