import styled from "styled-components";

// If user is logged-in: currentUser, else anotherUser
const Container = styled.li`
  list-style: none;
  display: flex;
  justify-content: ${({ currentUser }) =>
    currentUser ? "flex-end" : "flex-start"};
`;

const Grid = styled.div`
  display: grid;
  grid-template-areas: ${({ currentUser }) =>
    currentUser
      ? '"name avatar" "message avatar"'
      : '"avatar name" "avatar message"'};
  grid-column-gap: 10px;
`;

const Avatar = styled.div`
  grid-area: avatar;
  height: 50px;

  img {
    height: 100%;
    width: auto;
  }
`;

const Name = styled.div`
  grid-area: name;
  display: flex;
  justify-content: ${({ currentUser }) =>
    currentUser ? "flex-end" : "flex-start"};
`;

const Message = styled.div`
  display: grid;
  grid-template-areas: "text text text" "timestamp timestamp timestamp";
  grid-row-gap: 10px;
  grid-area: message;

  width: auto;
  margin: 10px;
  border-radius: 15px;
  background: ${({ theme: { colors } }) => colors.strongBlue};
  padding: 20px;
  text-align: ${({ currentUser }) => (currentUser ? "right" : "left")};
  font-weight: 900;
  font-family: arial;
  position: relative;

  &:before {
    content: "";
    width: 0;
    height: 0;
    top: 0;
    position: absolute;
    left: ${({ theme: { message }, currentUser }) =>
      currentUser ? message.currentUser.left : message.anotherUser.left};
    right: ${({ theme: { message }, currentUser }) =>
      currentUser ? message.currentUser.right : message.anotherUser.right};
    border-left: ${({ theme: { message }, currentUser }) =>
      currentUser
        ? message.currentUser.borderLeft
        : message.anotherUser.borderLeft};
    border-right: ${({ theme: { message }, currentUser }) =>
      currentUser
        ? message.currentUser.borderRight
        : message.anotherUser.borderRight};
    border-top: ${({ theme: { message }, currentUser }) =>
      currentUser
        ? message.currentUser.borderTop
        : message.anotherUser.borderTop};
    border-bottom: ${({ theme: { message }, currentUser }) =>
      currentUser
        ? message.currentUser.borderBottom
        : message.anotherUser.borderBottom};
  }
`;

const Text = styled.div`
  grid-area: text;
`;

const Timestamp = styled.div`
  grid-area: timestamp;
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: ${({ theme: { colors } }) => colors.strongPink};
`;

const ChatroomMessage = ({ children, currentUser }) => {
  return (
    <Container currentUser={currentUser}>
      <Grid currentUser={currentUser}>
        <Avatar currentUser={currentUser}>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"
            alt=""
          />
        </Avatar>
        <Name currentUser={currentUser}>actaestfabula</Name>
        <Message currentUser={currentUser}>
          <Text>{children}</Text>
          <Timestamp>12.30</Timestamp>
        </Message>
      </Grid>
    </Container>
  );
};

export default ChatroomMessage;
