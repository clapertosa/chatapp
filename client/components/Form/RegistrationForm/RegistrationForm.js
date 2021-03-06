import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import { isEmail, normalizeEmail, isLength } from "validator";
import StyledContainer from "../../styles/StyledForm/StyledContainer";
import StyledForm from "../../styles/StyledForm/StyledForm";
import StyledInput from "../../styles/StyledForm/StyledInput";
import StyledError from "../../styles/StyledForm/StyledError";
import StyledButton from "../../styles/StyledForm/StyledButton";
import Spinner from "../../UI/Spinner/Spinner";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $nickname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      userInput: {
        nickname: $nickname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      nickname
      email
    }
  }
`;

class RegistrationForm extends Component {
  state = {
    userInput: {},
    modalIsOpened: false
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state.userInput}
      >
        {(createUser, { error, data, loading }) => {
          return (
            <Formik
              initialValues={{
                nickname: "",
                email: "",
                password: "",
                confirmPassword: ""
              }}
              validate={values => {
                let errors = {};
                // Nickname validation
                if (
                  !values.nickname ||
                  (values.nickname && values.nickname.trim().length === 0)
                ) {
                  errors.nickname = "Required";
                } else if (values.nickname !== values.nickname.toLowerCase()) {
                  errors.nickname = "Nickname must be lowercase";
                } else if (!isLength(values.nickname, { min: 4, max: 16 })) {
                  errors.nickname = "Nickname must be between 4 and 16 chars";
                } else if (values.nickname.includes(" ")) {
                  errors.nickname = "Whitespace are not allowed";
                }
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
                } else if (values.password.includes(" ")) {
                  errors.password = "White spaces are not allowed";
                } else if (!isLength(values.password, { min: 8, max: 16 })) {
                  errors.password = "Password must be between 8 and 16 chars";
                }
                // Confirm Password validation
                if (!values.confirmPassword) {
                  errors.confirmPassword = "Required";
                } else if (values.confirmPassword !== values.password) {
                  errors.confirmPassword = "Passwords don't match";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.setState({ userInput: values }, async () => {
                  await createUser().then(() => {
                    this.props.showModal();
                    this.setState({ modalIsOpened: true });
                  });
                });
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
                <StyledContainer modalIsOpened={this.state.modalIsOpened}>
                  <StyledForm
                    title="Register"
                    method="POST"
                    handleSubmit={handleSubmit}
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
                      autoFocus
                      autoCapitalize="off"
                      autoComplete="off"
                      label="Nickname (lowercase)"
                      type="text"
                      name="nickname"
                      value={values.nickname}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {(errors.nickname &&
                      touched.nickname &&
                      errors.nickname && (
                        <StyledError>{errors.nickname}</StyledError>
                      )) ||
                      (this.state.userInput.nickname === values.nickname &&
                        error &&
                        error.graphQLErrors[0].type === "nickname" && (
                          <StyledError
                            type="nickname"
                            errors={error.graphQLErrors}
                          />
                        ))}
                    <StyledInput
                      autoComplete="off"
                      label="Email"
                      type="email"
                      name="email"
                      value={values.email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {(errors.email && touched.email && errors.email && (
                      <StyledError>{errors.email}</StyledError>
                    )) ||
                      (this.state.userInput.email === values.email &&
                        error &&
                        error.graphQLErrors[0].type === "email" && (
                          <StyledError errors={error.graphQLErrors} />
                        ))}
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
                    <StyledInput
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword && (
                        <StyledError>{errors.confirmPassword}</StyledError>
                      )}
                  </StyledForm>
                </StyledContainer>
              )}
            </Formik>
          );
        }}
      </Mutation>
    );
  }
}

export default RegistrationForm;
