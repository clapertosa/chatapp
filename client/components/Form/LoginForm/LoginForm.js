import React, { Component } from "react";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../../../hoc/User/User";
import { Formik } from "formik";
import Link from "next/link";
import { isEmail, normalizeEmail } from "validator";
import StyledContainer from "../../styles/StyledForm/StyledContainer";
import StyledForm from "../../styles/StyledForm/StyledForm";
import StyledInput from "../../styles/StyledForm/StyledInput";
import StyledError from "../../styles/StyledForm/StyledError";
import StyledButton from "../../styles/StyledForm/StyledButton";
import Spinner from "../../UI/Spinner/Spinner";

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;

class LoginForm extends Component {
  state = {
    error: undefined,
    loading: false
  };

  login = async (client, values) => {
    this.setState({ error: undefined, loading: true });
    try {
      await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: values,
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      });
      Router.push("/");
    } catch (e) {
      this.setState({
        error: e.networkError.result.errors[0].error.message,
        loading: false
      });
    }
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              let errors = {};
              // Email validation
              if (
                !values.email ||
                (values.email && values.email.trim().length === 0)
              ) {
                errors.email = "Required";
              } else if (!isEmail(normalizeEmail(values.email))) {
                errors.email = "Invalid email address";
              }
              // Password validation
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await this.login(client, values);
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
              <StyledContainer>
                <StyledForm
                  title="Login"
                  method="POST"
                  handleSubmit={handleSubmit}
                  button={
                    <>
                      <StyledButton
                        type="submit"
                        disabled={isSubmitting || this.state.loading}
                      >
                        {this.state.loading ? <Spinner /> : "Submit"}
                      </StyledButton>
                      <Link href="/login/new-password">
                        <a>Forgot your password?</a>
                      </Link>
                    </>
                  }
                >
                  <StyledInput
                    label="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {errors.email && touched.email && errors.email && (
                    <StyledError>{errors.email}</StyledError>
                  )}
                  <StyledInput
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {errors.password && touched.password && errors.password && (
                    <StyledError>{errors.password}</StyledError>
                  )}
                  {this.state.error ? (
                    <StyledError>{this.state.error}</StyledError>
                  ) : null}
                </StyledForm>
              </StyledContainer>
            )}
          </Formik>
        )}
      </ApolloConsumer>
    );
  }
}

export default LoginForm;
