import React, { Component } from "react";
import Head from "next/head";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import RegistrationForm from "../../components/Form/RegistrationForm/RegistrationForm";
import Modal from "../../components/Modal/Modal";

class Registration extends Component {
  state = {
    showModal: false
  };

  setShowModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <>
        <Head>
          <title>Chat App 🎈 | New User registration</title>
        </Head>
        <RegistrationForm showModal={this.setShowModal} />
        <Modal showModal={this.state.showModal}>
          Thanks for your registration! Check your emails to activate your
          account.
        </Modal>
      </>
    );
  }
}

Registration.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (user.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default Registration;
