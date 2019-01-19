import React, { Component } from "react";
import styled from "styled-components";
import ChatroomMessage from "./ChatroomMessage";

const Container = styled.div`
  grid-area: messages;
  /* background-color: ${({ theme: { colors } }) => colors.lightBlue}; */
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  padding: 25px;
  overflow-y: auto;

  ul {
    margin: 0;
    padding: 0;
  }
`;

class ChatroomMessages extends Component {
  componentDidMount() {
    this.scrollToBottom("smooth");
  }

  componentDidUpdate() {
    this.scrollToBottom("smooth");
  }

  scrollToBottom = behavior => {
    setTimeout(() => {
      this.messagesEnd.scrollIntoView({ behavior });
    }, 200);
  };

  render() {
    return (
      <Container>
        <ul>
          {this.props.messages.map((message, index) => (
            <ChatroomMessage
              key={index}
              nickname={message.nickname}
              avatar={message.avatar}
              currentUser={
                this.props.userId === (message.userId || message.user_id)
              }
              timestamp={message.created_at}
            >
              {message.message}
            </ChatroomMessage>
          ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </ul>
      </Container>
    );
  }
}

export default ChatroomMessages;
