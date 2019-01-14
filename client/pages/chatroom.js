import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import chatroomExists from "../lib/chatroomExists";
import { default as ChatroomContainer } from "../containers/Chatroom";

const Chatroom = () => {
  return <ChatroomContainer />;
};

export default Chatroom;

Chatroom.getInitialProps = async context => {
  //* Check if user is logged-in
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/welcome");
  }

  //* Check if chatroom exists
  const { chatroom } = await chatroomExists(
    context.apolloClient,
    context.query.name
  );

  if (!chatroom) {
    redirect(context, "/");
  }

  return {};
};
