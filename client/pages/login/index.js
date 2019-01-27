import Head from "next/head";
import LoginForm from "../../components/Form/LoginForm/LoginForm";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";

const Login = () => {
  return (
    <>
      <Head>
        <title>Chat App 🎈 | User login</title>
      </Head>
      <LoginForm />
    </>
  );
};

Login.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (user.currentUser) {
    redirect(context, "/");
    return {};
  }

  await context.apolloClient.cache.reset();

  return {};
};

export default Login;
