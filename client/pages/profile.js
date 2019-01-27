import Head from "next/head";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { default as ProfileComponent } from "../components/Profile/Profile";

const Profile = ({ nickname }) => {
  return (
    <>
      <Head>
        <title>Chat App 🎈 | {nickname}'s profile</title>
      </Head>
      <ProfileComponent />
    </>
  );
};

Profile.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
    return {};
  }

  return { nickname: user.currentUser.nickname };
};

export default Profile;
