import styled from "styled-components";
import moment from "moment";

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
      ? '"nickname avatar" "message avatar"'
      : '"avatar nickname" "avatar message"'};
  grid-column-gap: 10px;
`;

const Avatar = styled.div`
  grid-area: avatar;
  height: 50px;

  img {
    border-radius: 100%;
    height: 100%;
    width: auto;
  }
`;

const Nickname = styled.div`
  grid-area: nickname;
  display: flex;
  color: ${({ theme: { colors } }) => colors.mediumPink};
  font-weight: bold;
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

  white-space: pre-wrap;

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

const ChatroomMessage = ({
  children,
  currentUser,
  nickname,
  avatar,
  timestamp
}) => {
  return (
    <Container currentUser={currentUser}>
      <Grid currentUser={currentUser}>
        <Avatar currentUser={currentUser}>
          <img src={avatar} alt={`${nickname}'s avatar`} />
        </Avatar>
        <Nickname currentUser={currentUser}>
          {currentUser ? "me" : nickname}
        </Nickname>
        <Message currentUser={currentUser}>
          <Text>{children}</Text>
          <Timestamp title={moment(timestamp).format("MMMM DD, YYYY")}>
            {moment(timestamp).format("HH:mm")}
          </Timestamp>
        </Message>
      </Grid>
    </Container>
  );
};

export default ChatroomMessage;
