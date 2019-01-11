import styled from "styled-components";

// Limit 11
const Container = styled.div`
  display: grid;
  grid-template-areas: "title" "main";
  grid-template-rows: auto 1fr;
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  border-radius: 10px;
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
  box-shadow: 3px 3px 3px ${({ theme: { colors } }) => colors.strongPink};
  width: 100%;
  margin: 10px;
  max-width: 300px;
  max-height: 25rem;
`;

const Title = styled.div`
  grid-area: title;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  padding: 5px;
  font-weight: bold;
`;

const List = styled.ul`
  grid-area: main;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 5px;
`;

const Card = () => {
  return (
    <Container>
      <Title>Your last Chatrooms</Title>
      <List>
        <ListItem>lallalero</ListItem>
        <ListItem>wonderful</ListItem>
        <ListItem>life</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
        <ListItem>the hermit</ListItem>
      </List>
    </Container>
  );
};

export default Card;
