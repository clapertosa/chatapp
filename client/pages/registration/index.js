import React, { Component } from "react";
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
        <RegistrationForm showModal={this.setShowModal} />
        <Modal showModal={this.state.showModal}>
          Thanks for your registration! Check your emails to activate your
          account.
        </Modal>
      </>
    );
  }
}

export default Registration;
