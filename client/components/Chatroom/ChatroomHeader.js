import styled from "styled-components";
import User from "../../hoc/User/User";

const Container = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  z-index: 20;

  & > span,
  div {
    margin: 0 10px;
  }

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    justify-content: center;
    & > span,
    div {
      margin: 0;
    }
  }
`;

const Title = styled.span`
  font-family: "Webpixel";
  font-size: 3rem;
`;

const Options = styled.div`
  display: flex;
`;

const Cog = styled.i`
  color: ${({ theme: { colors } }) => colors.strongPink};
  font-size: 2rem;
  cursor: pointer;
`;

const DrawerToggle = styled.i`
  color: ${({ theme: { colors } }) => colors.strongPink};
  font-size: 2rem;
  cursor: pointer;

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    display: none;
  }
`;

const ChatroomHeader = ({ showUsersDrawerToggle }) => {
  return (
    <User>
      {({ data: { currentUser } }) => (
        <Container>
          <Title>asd</Title>
          <Options>
            <DrawerToggle
              onClick={showUsersDrawerToggle}
              className="icon-users"
            />
            {currentUser ? <Cog className="icon-cog" /> : null}
          </Options>
        </Container>
      )}
    </User>
  );
};

export default ChatroomHeader;
