import React, { Component } from "react";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import chatroomExists from "../lib/chatroomExists";
import io from "socket.io-client";
import ChatroomContainer from "../components/Chatroom/ChatroomContainer";

class Chatroom extends Component {
  state = {
    users: [],
    messages: []
  };
  static async getInitialProps(context) {
    //* Check if user is logged-in
    const { user } = await checkLoggedIn(context.apolloClient);

    if (!user.currentUser) {
      redirect(context, "/login");
    }

    //* Check if chatroom exists
    const { chatroom } = await chatroomExists(
      context.apolloClient,
      context.query.name
    );

    if (!chatroom) {
      redirect(context, "/");
    }

    return {
      user: user.currentUser,
      chatroom: chatroom.currentChatroom
    };
  }

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

  render() {
    return (
      <ChatroomContainer
        chatroom={this.props.chatroom}
        user={this.props.user}
        users={this.state.users}
        messages={this.state.messages.sort(
          (a, b) => a.created_at > b.created_at
        )}
      />
    );
  }
}

export default Chatroom;
