import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import gql from "graphql-tag";
import Card from "../../components/Card/Card";
import styled from "styled-components";
import StyledLink from "../../components/styles/StyledLink";

const GET_ALL_CHATROOMS_QUERY = gql`
  query getAllChatrooms {
    getAllChatrooms {
      id
      name
      protected
      created_at
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 10px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
`;

const Index = ({ chatrooms }) => {
  return chatrooms.length > 0 ? (
    <Container>
      <Title>Edit Chatrooms</Title>
      <Card title="Your Chatrooms" chatrooms={chatrooms} />
    </Container>
  ) : (
    <Container>
      <h1>
        Soooo empty! <StyledLink href="/">create</StyledLink> a new Chatroom! 🎈
      </h1>
    </Container>
  );
};

Index.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
  }

  const chatrooms = await context.apolloClient.query({
    query: GET_ALL_CHATROOMS_QUERY
  });

  return { chatrooms: chatrooms.data.getAllChatrooms };
};

export default Index;
