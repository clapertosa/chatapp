import React, { Component } from "react";
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

class ChatroomInput extends Component {
  state = {
    placeholder: "Write a message",
    message: ""
  };

  onChangeHandler = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <Container>
        <Input
          spellCheck
          placeholder="Write a message"
          onChange={this.onChangeHandler}
        />
        <Send
          className="icon-paper-plane-empty"
          disabled={this.state.message.length <= 0}
        />
      </Container>
    );
  }
}

export default ChatroomInput;
