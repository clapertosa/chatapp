import Head from "next/head";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import gql from "graphql-tag";
import Card from "../../components/Card/Card";
import styled from "styled-components";
import StyledLink from "../../components/styles/StyledLink";

const GET_MY_CHATROOMS_QUERY = gql`
  query getMyChatrooms {
    getMyChatrooms {
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
      <Head>
        <title>Chat App 🎈 | Your Chatrooms list</title>
      </Head>
      <Title>Edit Chatrooms</Title>
      <Card title="Chatrooms list" chatrooms={chatrooms} settings />
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
    return {};
  }

  const chatrooms = await context.apolloClient.query({
    query: GET_MY_CHATROOMS_QUERY
  });

  return { chatrooms: chatrooms.data.getMyChatrooms };
};

export default Index;
