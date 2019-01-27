import Head from "next/head";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { Formik } from "formik";
import checkLoggedIn from "../../../lib/checkLoggedIn";
import redirect from "../../../lib/redirect";
import StyledContainer from "../../../components/styles/StyledForm/StyledContainer";
import StyledForm from "../../../components/styles/StyledForm/StyledForm";
import StyledInput from "../../../components/styles/StyledForm/StyledInput";
import StyledButton from "../../../components/styles/StyledForm/StyledButton";
import StyledError from "../../../components/styles/StyledForm/StyledError";
import Spinner from "../../../components/UI/Spinner/Spinner";
import checkPermission from "../../../lib/checkPermission";
import chatroomExists from "../../../lib/chatroomExists";

const GRANT_PERMISSION_MUTATION = gql`
  mutation GRANT_PERMISSION_MUTATION($name: String!, $password: String!) {
    grantPermission(name: $name, password: $password)
  }
`;

class Access extends Component {
  state = {
    password: ""
  };

  render() {
    return (
      <Mutation mutation={GRANT_PERMISSION_MUTATION}>
        {(grantPermission, { data, error, loading }) => (
          <>
            <Head>
              <title>Chat App 🎈 | Access validation</title>
            </Head>
            <Formik
              initialValues={{ password: "" }}
              validate={values => {
                let errors = {};

                if (values.password.length <= 0) {
                  errors.password = "Required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                this.setState({ password: values.password });
                try {
                  await grantPermission({
                    variables: {
                      name: this.props.chatroomName,
                      password: values.password
                    }
                  });
                  setSubmitting(false);
                  Router.replace(`/chatroom/${this.props.chatroomName}`);
                } catch (e) {
                  setSubmitting(false);
                }
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                values,
                errors,
                touched
              }) => (
                <StyledContainer>
                  <StyledForm
                    method="POST"
                    handleSubmit={handleSubmit}
                    title="Chatroom Password"
                    button={
                      <StyledButton
                        type="submit"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? <Spinner /> : "Submit"}
                      </StyledButton>
                    }
                  >
                    <StyledInput
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="password"
                      type="password"
                    />
                    {errors.password && touched.password && errors.password && (
                      <StyledError>{errors.password}</StyledError>
                    )}
                    {!errors.password &&
                      error &&
                      values.password === this.state.password &&
                      error.graphQLErrors && (
                        <StyledError errors={error.graphQLErrors} />
                      )}
                  </StyledForm>
                </StyledContainer>
              )}
            </Formik>
          </>
        )}
      </Mutation>
    );
  }
}

Access.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (!user.currentUser) {
    redirect(context, "/login");
    return {};
  }

  const { chatroom } = await chatroomExists(
    context.apolloClient,
    context.query.name
  );

  if (!chatroom.currentChatroom) {
    redirect(context, "/");
    return {};
  }

  //* Check if user is permitted
  if (chatroom.currentChatroom.protected) {
    const { permission } = await checkPermission(
      context.apolloClient,
      chatroom.currentChatroom.id
    );
    if (Object.keys(permission).length > 0) {
      redirect(context, `/chatroom/${chatroom.currentChatroom.name}`);
    }
  }

  return { chatroomName: context.query.name };
};

export default Access;
