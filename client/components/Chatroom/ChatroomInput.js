import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import io from "socket.io-client";
import styled from "styled-components";

const Container = styled.div`
  grid-area: input;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
`;

const Input = styled.textarea`
  border: none;
  background-color: ${({ theme: { colors } }) => colors.lightBlue};
  font-size: 1rem;
  color: ${({ theme: { colors } }) => colors.lightPink};
  width: 80%;
  height: auto;
  border-radius: 20px;
  padding: 10px;
  overflow-x: none;
  overflow-y: auto;
  resize: none;
  outline: none;
`;

const Send = styled.i`
  font-size: 2rem;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.lightPink : theme.colors.strongPink};
  transition: color 0.3s ease-out;
  cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION(
    $chatroomId: ID!
    $userId: ID!
    $message: String!
  ) {
    createMessage(chatroomId: $chatroomId, userId: $userId, message: $message)
  }
`;

class ChatroomInput extends Component {
  state = {
    placeholder: "Write a message",
    message: ""
  };

  componentDidMount() {
    this.socket = io();
  }

  onChangeHandler = e => {
    this.setState({ message: e.target.value });
  };

  submitMessage = () => {
    const message = {
      chatroomId: this.props.chatroomId,
      message: this.state.message,
      userId: this.props.user.id,
      nickname: this.props.user.nickname,
      avatar: this.props.user.avatar,
      timestamp: new Date()
    };
    this.socket.emit("createMessage", message);
  };

  validateMessage = () => {
    const message = this.state.message;

    if (message && message.trim().length > 0) {
      return true;
    }

    if (message.length > 0 && message.match(/n+/) && message.match(/\w/)) {
      return true;
    }

    return false;
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_MESSAGE_MUTATION}
        variables={{
          chatroomId: this.props.chatroomId,
          userId: this.props.user.id,
          message: this.state.message
        }}
      >
        {(createMessage, { data, error, loading }) => (
          <Container>
            <Input
              spellCheck
              placeholder="Write a message"
              onChange={this.onChangeHandler}
              onKeyDown={async e => {
                if (
                  e.keyCode == 13 &&
                  e.shiftKey == false &&
                  this.validateMessage()
                ) {
                  e.preventDefault();
                  await createMessage();
                  this.submitMessage();
                  this.setState({ message: "" });
                }
              }}
              value={this.state.message}
            />
            <Send
              onClick={async () => {
                if (this.validateMessage) {
                  await createMessage();
                  this.submitMessage();
                  this.setState({ message: "" });
                }
              }}
              className="icon-paper-plane-empty"
              disabled={
                this.state.message.length <= 0 ||
                loading ||
                !this.validateMessage()
              }
            />
          </Container>
        )}
      </Mutation>
    );
  }
}

export default ChatroomInput;
