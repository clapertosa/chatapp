import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { Formik } from "formik";
import { isEmpty, isLength, isLowercase } from "validator";
import StyledContainer from "../components/styles/StyledForm/StyledContainer";
import StyledForm from "../components/styles/StyledForm/StyledForm";
import StyledInput from "../components/styles/StyledForm/StyledInput";
import StyledError from "../components/styles/StyledForm/StyledError";
import StyledButton from "../components/styles/StyledForm/StyledButton";
import styled from "styled-components";
import Card from "../components/Card/Card";
import Spinner from "../components/UI/Spinner/Spinner";

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "form" "cards";
  grid-row-gap: 50px;
  margin: 10px auto;
  width: 90%;

  @media (min-width: ${props => props.theme.mediaQuery.minWidth}) {
    width: 70%;
  }
`;

const FormArea = styled.div`
  grid-area: form;
`;

const CardsArea = styled.div`
  grid-area: cards;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CREATE_CHATROOM_MUTATION = gql`
  mutation CREATE_CHATROOM_MUTATION($name: String!) {
    createChatroom(chatroomInput: { name: $name }) {
      id
    }
  }
`;

const JOIN_CHATROOM_QUERY = gql`
  query JOIN_CHATROOM_QUERY($name: String!) {
    joinChatroom(name: $name)
  }
`;

class CreateJoin extends Component {
  state = {
    clickedButton: undefined,
    loading: false,
    error: null,
    chatroomName: null
  };

  setClickedButton = buttonName => {
    this.setState({ clickedButton: buttonName });
  };

  createChatroom = async (client, name) => {
    this.setState({ loading: true });
    try {
      await client.mutate({
        mutation: CREATE_CHATROOM_MUTATION,
        variables: { name }
      });
      Router.replace(`/chatroom/${name}`);
    } catch (err) {
      this.setState({
        error: err.graphQLErrors,
        loading: false,
        clickedButton: undefined
      });
    }
    this.setState({ loading: false });
  };

  joinChatroom = async (client, name) => {
    this.setState({ loading: true });
    try {
      await client.query({
        query: JOIN_CHATROOM_QUERY,
        variables: { name }
      });
      Router.replace(`/chatroom/${name}`);
    } catch (err) {
      this.setState({
        error: err.graphQLErrors,
        loading: false,
        clickedButton: undefined
      });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Wrapper>
            <FormArea>
              <Formik
                initialValues={{ name: "" }}
                validate={({ name }) => {
                  let errors = {};
                  if (isEmpty(name, { ignore_whitespace: true })) {
                    errors.name = "Required";
                  } else if (!isLowercase(name)) {
                    errors.name = "Name must be lowercase";
                  } else if (!isLength(name, { min: 3, max: 20 })) {
                    errors.name = "Name must be between 3 and 20 chars";
                  } else if (name.includes(" ")) {
                    errors.name = "White spaces not allowed";
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  this.setState({ error: null, chatroomName: null });
                  if (this.state.clickedButton === "create") {
                    await this.createChatroom(client, values.name);
                    this.setState({ chatroomName: values.name });
                  } else if (this.state.clickedButton === "join") {
                    await this.joinChatroom(client, values.name);
                    this.setState({ chatroomName: values.name });
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  isSubmitting,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  errors,
                  values
                }) => (
                  <StyledContainer width="100%">
                    <StyledForm
                      title="Join/Create a Chatroom"
                      method="POST"
                      handleSubmit={handleSubmit}
                      flexFlow="row"
                      button={
                        <>
                          <StyledButton
                            clicked={() => this.setClickedButton("join")}
                            name="join"
                            type="submit"
                            disabled={isSubmitting || this.state.loading}
                          >
                            {this.state.loading &&
                            this.state.clickedButton === "join" ? (
                              <Spinner />
                            ) : (
                              "Join"
                            )}
                          </StyledButton>
                          <StyledButton
                            clicked={() => this.setClickedButton("create")}
                            name="create"
                            type="submit"
                            disabled={isSubmitting || this.state.loading}
                            margin={"0 0 0 10px"}
                          >
                            {this.state.loading &&
                            this.state.clickedButton === "create" ? (
                              <Spinner />
                            ) : (
                              "Create"
                            )}
                          </StyledButton>
                        </>
                      }
                    >
                      <StyledInput
                        autoFocus
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                      {errors.name && touched.name && errors.name && (
                        <StyledError>{errors.name}</StyledError>
                      )}
                      {!errors.name &&
                      this.state.chatroomName === values.name &&
                      this.state.error ? (
                        <StyledError errors={this.state.error} />
                      ) : null}
                    </StyledForm>
                  </StyledContainer>
                )}
              </Formik>
            </FormArea>
            <CardsArea>
              <Card />
              <Card />
            </CardsArea>
          </Wrapper>
        )}
      </ApolloConsumer>
    );
  }
}

export default CreateJoin;
