import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import Spinner from "../components/UI/Spinner/Spinner";

const Index = () => {
  return (
    <div>
      <Spinner />
    </div>
  );
};

Index.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/welcome");
  }

  return {};
};
export default Index;
