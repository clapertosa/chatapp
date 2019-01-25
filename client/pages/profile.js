import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { default as ProfileComponent } from "../components/Profile/Profile";

const Profile = () => {
  return <ProfileComponent />;
};

Profile.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
  }

  return {};
};

export default Profile;
