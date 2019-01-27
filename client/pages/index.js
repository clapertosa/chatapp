import Head from "next/head";
import gql from "graphql-tag";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import CreateJoin from "../containers/CreateJoin";

const GET_MY_CHATROOMS_QUERY = gql`
  query GET_MY_CHATROOMS_QUERY {
    getMyChatrooms {
      id
      name
      protected
      created_at
    }
  }
`;

const GET_WRITTEN_IN_CHATROOMS_QUERY = gql`
  query GET_WRITTEN_IN_CHATROOMS_QUERY {
    getWrittenInChatrooms {
      id
      name
      protected
      created_at
    }
  }
`;

const Index = ({ userChatrooms, writtenInChatrooms }) => {
  return (
    <>
      <Head>
        <title>Chat App 🎈 | Home</title>
      </Head>
      <CreateJoin
        userChatrooms={userChatrooms}
        writtenInChatrooms={writtenInChatrooms}
      />
    </>
  );
};

Index.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/welcome");
    return {};
  }

  // Get user's chatrooms and those in which he wrote
  const {
    data: { getMyChatrooms }
  } = await context.apolloClient.query({
    query: GET_MY_CHATROOMS_QUERY
  });

  const {
    data: { getWrittenInChatrooms }
  } = await context.apolloClient.query({
    query: GET_WRITTEN_IN_CHATROOMS_QUERY
  });

  getWrittenInChatrooms.sort((a, b) => {
    let keyA = new Date(a.created_at),
      keyB = new Date(b.created_at);
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });

  return {
    userChatrooms: getMyChatrooms,
    writtenInChatrooms: getWrittenInChatrooms
  };
};
export default Index;
