import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const Chatroom = () => {
  return <div>Chatroooom</div>;
};

export default Chatroom;

Chatroom.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/welcome");
  }

  return {};
};
