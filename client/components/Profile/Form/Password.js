import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import { isEmpty, isLength } from "validator";
import StyledForm from "../../styles/StyledForm/StyledForm";
import StyledInput from "../../styles/StyledForm/StyledInput";
import StyledButton from "../../styles/StyledForm/StyledButton";
import StyledError from "../../styles/StyledForm/StyledError";
import StyledSuccess from "../../styles/StyledForm/StyledSuccess";
import Spinner from "../../UI/Spinner/Spinner";
import styled from "styled-components";

const Container = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION(
    $password: String!
    $confirmPassword: String!
  ) {
    changePassword(password: $password, confirmPassword: $confirmPassword)
  }
`;

class Password extends Component {
  state = {
    successMessage: null,
    errorMessage: null
  };

  render() {
    return (
      <Container show={this.props.show}>
        <Mutation mutation={CHANGE_PASSWORD_MUTATION}>
          {(changePassword, { data, error, loading }) => (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validate={values => {
                this.setState({ successMessage: null, errorMessage: null });
                let errors = {};

                // Confirm Password
                if (isEmpty(values.password, { ignore_whitespace: true })) {
                  errors.password = "Required";
                } else if (values.password.includes(" ")) {
                  errors.password = "White spaces not allowed";
                } else if (!isLength(values.password, { min: 8, max: 16 })) {
                  errors.password = "Password must be between 8 and 16 chars";
                }

                // Confirm Password validation
                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Passwords don't match";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                this.setState({ successMessage: null, errorMessage: null });
                try {
                  await changePassword({
                    variables: {
                      password: values.password,
                      confirmPassword: values.confirmPassword
                    }
                  });
                  this.setState({
                    successMessage: "Password successfully changed"
                  });
                  setSubmitting(false);
                } catch (e) {
                  this.setState({
                    errorMessage: e.graphQLErrors[0].error.message
                  });
                  setSubmitting(false);
                }
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                isSubmitting
              }) => (
                <StyledForm
                  handleSubmit={handleSubmit}
                  noBorder
                  title="Change Password"
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
                    label="New Password"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="password"
                    type="password"
                    value={values.password}
                  />
                  {errors.password && (
                    <StyledError>{errors.password}</StyledError>
                  )}
                  <StyledInput
                    label="Confirm Password"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <StyledError>{errors.confirmPassword}</StyledError>
                  )}
                  {!errors.password &&
                    !errors.confirmPassword &&
                    this.state.errorMessage && (
                      <StyledError>{this.state.errorMessage}</StyledError>
                    )}
                  {data && this.state.successMessage && (
                    <StyledSuccess>{this.state.successMessage}</StyledSuccess>
                  )}
                </StyledForm>
              )}
            </Formik>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default Password;
