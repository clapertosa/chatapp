import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import CreateJoin from "../containers/CreateJoin";

const Index = () => {
  return <CreateJoin />;
};

Index.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/welcome");
  }

  return {};
};
export default Index;
