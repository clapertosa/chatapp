import React, { Component } from "react";
import User, { CURRENT_USER_QUERY } from "../../../hoc/User/User";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import { isEmail, normalizeEmail, isEmpty } from "validator";
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

const CHANGE_EMAIL_MUTATION = gql`
  mutation CHANGE_EMAIL_MUTATION($email: String!, $confirmEmail: String!) {
    changeEmail(email: $email, confirmEmail: $confirmEmail)
  }
`;

class Email extends Component {
  state = {
    successMessage: null,
    errorMessage: null
  };
  render() {
    return (
      <Container show={this.props.show}>
        <User>
          {({ data: { currentUser } }) => (
            <Mutation
              mutation={CHANGE_EMAIL_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(changeEmail, { data, error, loading }) => (
                <Formik
                  initialValues={{
                    email: currentUser ? currentUser.email : "",
                    confirmEmail: ""
                  }}
                  validate={values => {
                    this.setState({ successMessage: null, errorMessage: null });
                    let errors = {};

                    // Check email validation
                    if (isEmpty(values.email, { ignore_whitespace: true })) {
                      errors.email = "Required";
                    } else if (!isEmail(values.email)) {
                      errors.email = "Email not valid";
                    }

                    // Check email confirm validation
                    if (
                      isEmpty(values.confirmEmail, { ignore_whitespace: true })
                    ) {
                      errors.confirmEmail = "Required";
                    } else if (
                      normalizeEmail(values.email) !==
                      normalizeEmail(values.confirmEmail)
                    ) {
                      errors.confirmEmail = "Emails don't match";
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    this.setState({ successMessage: null, errorMessage: null });
                    try {
                      await changeEmail({
                        variables: {
                          email: values.email,
                          confirmEmail: values.confirmEmail
                        }
                      });
                      this.setState({
                        successMessage: "Email successfully changed"
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
                      title="Change Email"
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
                        label="Email"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="email"
                        type="email"
                        value={values.email}
                      />
                      {errors.email && (
                        <StyledError>{errors.email}</StyledError>
                      )}
                      <StyledInput
                        label="Confirm Email"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="confirmEmail"
                        type="email"
                        value={values.confirmEmail}
                      />
                      {errors.confirmEmail && (
                        <StyledError>{errors.confirmEmail}</StyledError>
                      )}
                      {!errors.email &&
                        !errors.confirmEmail &&
                        this.state.errorMessage && (
                          <StyledError>{this.state.errorMessage}</StyledError>
                        )}
                      {data && this.state.successMessage && (
                        <StyledSuccess>
                          {this.state.successMessage}
                        </StyledSuccess>
                      )}
                    </StyledForm>
                  )}
                </Formik>
              )}
            </Mutation>
          )}
        </User>
      </Container>
    );
  }
}

export default Email;
