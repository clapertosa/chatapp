import styled from "styled-components";

const Container = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  font-weight: bold;
  margin: 10px;
  height: 2rem;
`;

const Avatar = styled.div`
  height: 100%;
  margin: auto 10px;

  img {
    height: 100%;
    width: auto;
  }
`;

const ChatroomUser = ({ nickname, avatar }) => {
  return (
    <Container>
      <Avatar>
        <img src={avatar} alt={`${nickname}'s avatar`} />
      </Avatar>{" "}
      {nickname}
    </Container>
  );
};

export default ChatroomUser;
