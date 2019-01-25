import styled from "styled-components";
import moment from "moment";
import StyledLink from "../styles/StyledLink";

// Limit 11
const Container = styled.div`
  display: grid;
  grid-template-areas: "title" "main";
  grid-template-rows: auto 1fr;
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  border-radius: 10px;
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
  box-shadow: 3px 3px 3px ${({ theme: { colors } }) => colors.strongPink};
  width: 80%;
  margin: 10px;
  max-width: 400px;
  max-height: 25rem;
`;

const Title = styled.div`
  grid-area: title;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  padding: 5px;
  font-weight: bold;
  text-align: center;
`;

const List = styled.ul`
  grid-area: main;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
`;

const ListItem = styled.li`
  display: grid;
  grid-gap: 3px;
  grid-template-areas: "name protected createdAt";
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 5px;
  text-align: center;
`;

const Name = styled.div`
  grid-area: name;
  font-weight: bold;
`;

const Protected = styled.div`
  grid-area: protected;
`;

const CreatedAt = styled.div`
  grid-area: createdAt;
`;

const Card = ({ title, chatrooms }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {chatrooms.map(chatroom => (
          <StyledLink
            key={chatroom.id}
            href={`/settings/chatroom/${chatroom.name}`}
            noBorder
            noHover
          >
            <ListItem>
              <Name>{chatroom.name}</Name>
              <Protected>
                {chatroom.protected ? (
                  <i title="protected" className="icon-lock" />
                ) : (
                  <i title="unprotected" className="icon-lock-open" />
                )}
              </Protected>
              <CreatedAt>{moment(chatroom.created_at).fromNow()}</CreatedAt>
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Container>
  );
};

export default Card;
