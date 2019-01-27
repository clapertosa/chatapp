import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import chatroomExists from "../lib/chatroomExists";
import checkPermission from "../lib/checkPermission";
import ChatroomContainer from "../containers/Chatroom";

const Chatroom = props => {
  if (!props.chatroom && !props.user) {
    return null;
  }
  return <ChatroomContainer chatroom={props.chatroom} user={props.user} />;
};

Chatroom.getInitialProps = async context => {
  //* Check if user is logged-in
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
    return {};
  }

  //* Check if chatroom exists
  const { chatroom } = await chatroomExists(
    context.apolloClient,
    context.query.name
  );

  if (!chatroom.currentChatroom) {
    redirect(context, "/");
    return {};
  }

  //* Check if chatroom is protected
  if (chatroom.currentChatroom.protected) {
    const { permission } = await checkPermission(
      context.apolloClient,
      chatroom.currentChatroom.id
    );
    if (Object.keys(permission).length <= 0) {
      redirect(context, `/access/chatroom/${chatroom.currentChatroom.name}`);
    }
  }

  return {
    user: user.currentUser,
    chatroom: chatroom.currentChatroom
  };
};

export default Chatroom;
