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

const ChatroomUser = () => {
  return (
    <Container>
      <Avatar>
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"
          alt=""
        />
      </Avatar>{" "}
      user
    </Container>
  );
};

export default ChatroomUser;
