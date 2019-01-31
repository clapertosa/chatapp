import styled from "styled-components";
import User from "../../hoc/User/User";
import StyledLink from "../styles/StyledLink";

const Container = styled.div`
  grid-area: header;
  position: sticky;
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
  font-size: 2rem;
  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    font-size: 3rem;
  }
`;

const Options = styled.div`
  display: flex;
  i {
    font-size: 1.5rem;
  }

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    i {
      font-size: 2rem;
    }
  }
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

  span {
    font-style: normal;
    font-size: 1.2rem;
  }

  @media (min-width: ${({ theme: { mediaQuery } }) => mediaQuery.minWidth}) {
    display: none;
  }
`;

const ChatroomHeader = ({
  showUsersDrawerToggle,
  adminId,
  name,
  usersNumber
}) => {
  return (
    <User>
      {({ data: { currentUser } }) => (
        <Container>
          <Title>{name}</Title>
          <Options>
            <DrawerToggle
              onClick={showUsersDrawerToggle}
              className="icon-users"
            >
              <span>{usersNumber}</span>
            </DrawerToggle>
            {currentUser.id === adminId ? (
              <StyledLink href={`/settings/chatroom/${name}`} noBorder noHover>
                <Cog className="icon-cog" />
              </StyledLink>
            ) : null}
          </Options>
        </Container>
      )}
    </User>
  );
};

export default ChatroomHeader;
