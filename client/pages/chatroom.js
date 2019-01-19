import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import chatroomExists from "../lib/chatroomExists";
import ChatroomContainer from "../containers/Chatroom";

const Chatroom = props => {
  return <ChatroomContainer chatroom={props.chatroom} user={props.user} />;
};

Chatroom.getInitialProps = async context => {
  //* Check if user is logged-in
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
  }

  //* Check if chatroom exists
  const { chatroom } = await chatroomExists(
    context.apolloClient,
    context.query.name
  );

  if (!chatroom) {
    redirect(context, "/");
  }

  return {
    user: user.currentUser,
    chatroom: chatroom.currentChatroom
  };
};

export default Chatroom;
