import React, { Component } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import ChatroomHeader from "../components/Chatroom/ChatroomHeader";
import ChatroomMessages from "../components/Chatroom/ChatroomMessages/ChatroomMessages";
import ChatroomUsers from "../components/Chatroom/ChatroomUsers/ChatroomUsers";
import ChatroomInput from "../components/Chatroom/ChatroomInput";
import Backdrop from "../components/UI/Backdrop/Backdrop";

const Container = styled.div`
  width: 100%;
  position: absolute;
  height: calc(100% - (${({ theme }) => theme.mobileNavbarHeight}));
  min-height: 200px;
  display: grid;
  grid-template-areas: "header" "messages" "input";
  grid-template-rows: auto 1fr auto;

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    display: grid;
    position: relative;
    grid-template-areas: "header header" "users messages" "users input";
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: auto 1fr auto;
    border: 2px solid ${({ theme: { colors } }) => colors.strongPink};
    border-radius: 10px;
    width: 95%;
    height: calc(100vh - (${({ theme }) => theme.navbarHeight} + 2rem));
    max-width: 1350px;
    min-height: 200px;
    margin: 10px auto;
    overflow: hidden;
  }
`;

class Chatroom extends Component {
  state = {
    showUsers: false,
    users: [],
    messages: []
  };

  componentDidMount() {
    this.setState({ messages: this.props.chatroom.messages });
    this.socket = io();
    this.socket.emit("join", {
      chatroom: this.props.chatroom,
      user: this.props.user
    });
    this.socket.emit("getUsers", this.props.chatroom.id);
    this.socket.on("users", users => {
      this.setState({
        users: users.sort((a, b) => a.user.nickname > b.user.nickname)
      });
    });

    this.socket.on("newMessage", message => {
      this.setState(prevState => {
        return { messages: [...prevState.messages, message] };
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

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
          adminId={this.props.chatroom.admin_id}
          name={this.props.chatroom.name}
          usersNumber={this.state.users.length}
        />
        <ChatroomUsers
          show={this.state.showUsers}
          closeSideDrawer={this.closeSideDrawer}
          users={this.state.users}
        />
        <ChatroomMessages
          userId={this.props.user.id}
          messages={this.state.messages}
        />
        <ChatroomInput
          chatroomId={this.props.chatroom.id}
          user={this.props.user}
        />
        <Backdrop
          showBackdrop={this.state.showUsers}
          closeSideDrawer={this.closeSideDrawer}
          zIndex={10}
          usersSideDrawer
        />
      </Container>
    );
  }
}

export default Chatroom;
