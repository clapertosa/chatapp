import LoginForm from "../../components/Form/LoginForm/LoginForm";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";

const Login = () => {
  return <LoginForm />;
};

Login.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (user.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default Login;
