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
    window.addEventListener("resize", () => this.scrollToBottom("auto"));
    setTimeout(() => {
      this.scrollToBottom("smooth");
    }, 200);
  }

  componentDidUpdate() {
    const { scrollTop, scrollHeight, clientHeight } = document.querySelector(
      "#container"
    );

    if (this.props.messages.length > 0) {
      const newMessageHeight = Number.parseInt(
        getComputedStyle(
          document.querySelector("#messages").lastChild.previousSibling
        )
          .getPropertyValue("height")
          .replace("px", "")
      );

      const lastMessageHeight =
        this.props.messages.length > 1
          ? Number.parseInt(
              getComputedStyle(
                document.querySelector("#messages").lastChild.previousSibling
                  .previousSibling
              )
                .getPropertyValue("height")
                .replace("px", "")
            )
          : 0;

      if (
        scrollTop + clientHeight + newMessageHeight + lastMessageHeight >=
        scrollHeight
      ) {
        this.scrollToBottom();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.scrollToBottom("auto"));
  }

  scrollToBottom = (behavior = "auto") => {
    this.messagesEnd.scrollIntoView({ behavior });
  };

  render() {
    return (
      <Container id="container">
        <ul id="messages">
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
            id="lastMessage"
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
