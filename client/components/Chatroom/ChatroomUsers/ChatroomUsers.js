import styled from "styled-components";
import ChatroomUser from "./ChatroomUser";

const Container = styled.div`
  position: fixed;
  height: calc(100vh - 4rem);
  width: 50%;
  padding: 10px;
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
  border-right: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  overflow-y: scroll;
  z-index: 20;
  transition: transform 0.2s ease-out;
  transform: ${({ show }) => (show ? "translateX(0)" : "translateX(-200%)")};

  ul {
    margin: 0;
    padding: 0;
  }

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    grid-area: users;
    display: block;
    position: relative;
    height: 100%;
    width: auto;
    transform: none;
  }
`;

const ChatroomUsers = ({ show, closeSideDrawer, users }) => {
  let touchStart, touchEnd;
  return (
    <Container
      show={show}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() => (touchEnd < touchStart ? closeSideDrawer() : null)}
    >
      <ul>
        {users.map(user => (
          <ChatroomUser
            key={user.user.id}
            nickname={user.user.nickname}
            avatar={user.user.avatar}
          />
        ))}
      </ul>
    </Container>
  );
};

export default ChatroomUsers;
