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
  scrollToBottom = behavior => {
    setTimeout(() => {
      this.messagesEnd.scrollIntoView({ behavior });
    }, 200);
  };

  componentDidMount() {
    this.scrollToBottom("smooth");
  }

  componentDidUpdate() {
    this.scrollToBottom("smooth");
  }

  render() {
    return (
      <Container>
        <ul>
          <ChatroomMessage>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime in
            adipisci placeat, eaque iure fugiat voluptatum laboriosam ipsam,
            odio beatae aliquid eos quod veritatis porro! Porro consectetur
            nostrum dolorum dicta.
          </ChatroomMessage>
          <ChatroomMessage>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime in
            adipisci placeat, eaque iure fugiat voluptatum laboriosam ipsam,
            odio beatae aliquid eos quod veritatis porro! Porro consectetur
            nostrum dolorum dicta.
          </ChatroomMessage>
          <ChatroomMessage>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime in
            adipisci placeat, eaque iure fugiat voluptatum laboriosam ipsam,
            odio beatae aliquid eos quod veritatis porro! Porro consectetur
            nostrum dolorum dicta.
          </ChatroomMessage>
          <ChatroomMessage>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime in
            adipisci placeat, eaque iure fugiat voluptatum laboriosam ipsam,
            odio beatae aliquid eos quod veritatis porro! Porro consectetur
            nostrum dolorum dicta.
          </ChatroomMessage>
          <ChatroomMessage>Hello!!</ChatroomMessage>
          <ChatroomMessage>How you doing? 🍹</ChatroomMessage>
          <ChatroomMessage>Fine! Thanks!! 🐠</ChatroomMessage>
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
