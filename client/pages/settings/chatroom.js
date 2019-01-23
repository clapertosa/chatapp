import React, { Component } from "react";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import checkLoggedIn from "../../lib/checkLoggedIn";
import chatroomExists from "../../lib/chatroomExists";
import redirect from "../../lib/redirect";
import PasswordForm from "../../components/Chatroom/Settings/PasswordForm";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
`;

const Delete = styled.h2`
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.mediumPink};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.mediumPink};
`;

const Lock = styled.i`
  cursor: pointer;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  color: ${({ theme: { colors } }) => colors.strongPink};
`;

const REMOVE_PASSWORD_MUTATION = gql`
  mutation REMOVE_PASSWORD_MUTATION($id: ID!) {
    removePassword(id: $id)
  }
`;

const DELETE_CHATROOM_MUTATION = gql`
  mutation DELETE_CHATROOM_MUTATION($id: ID!) {
    deleteChatroom(id: $id)
  }
`;

class Chatroom extends Component {
  state = {
    showPasswordForm: false,
    lockOpen: false
  };

  removePassword = async client => {
    const removePassword = confirm(
      `Do you really want to remove password from "${
        this.props.chatroom.name
      }" chatroom?`
    );

    if (removePassword) {
      await client.mutate({
        mutation: REMOVE_PASSWORD_MUTATION,
        variables: { id: this.props.chatroom.id }
      });
      history.go(0);
    }
  };

  deleteChatroom = async client => {
    const deleteChatroom = confirm(
      `Are you sure you want to delete ${this.props.chatroom.name} chatroom?`
    );

    if (deleteChatroom) {
      await client.mutate({
        mutation: DELETE_CHATROOM_MUTATION,
        variables: { id: this.props.chatroom.id }
      });
      Router.replace("/");
    }
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Container>
            {this.props.chatroom.protected ? (
              <h1>
                Current Status: protected
                <Lock
                  title={this.state.lockOpen ? "Remove password" : null}
                  className={
                    this.state.lockOpen ? "icon-lock-open" : "icon-lock"
                  }
                  onMouseEnter={() => this.setState({ lockOpen: true })}
                  onMouseOut={() => this.setState({ lockOpen: false })}
                  onClick={() => this.removePassword(client)}
                />
              </h1>
            ) : (
              <h1>
                Current Status: unprotected <i className="icon-lock-open" />
              </h1>
            )}
            <PasswordForm
              chatroomId={this.props.chatroom.id}
              isProtected={this.props.chatroom.protected}
            />
            <Delete onClick={() => this.deleteChatroom(client)}>
              Delete this Chatroom
            </Delete>
          </Container>
        )}
      </ApolloConsumer>
    );
  }
}

Chatroom.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
  }

  const { chatroom } = await chatroomExists(
    context.apolloClient,
    context.query.name
  );

  if (!chatroom) {
    redirect(context, "/");
  }

  if (chatroom.currentChatroom.admin_id !== user.currentUser.id) {
    redirect(context, "/");
  }

  return {
    user: user.currentUser,
    chatroom: chatroom.currentChatroom
  };
};

export default Chatroom;
