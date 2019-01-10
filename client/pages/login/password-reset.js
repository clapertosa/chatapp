import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import { isEmpty, isLength } from "validator";
import StyledContainer from "../../components/styles/StyledForm/StyledContainer";
import StyledForm from "../../components/styles/StyledForm/StyledForm";
import StyledInput from "../../components/styles/StyledForm/StyledInput";
import StyledButton from "../../components/styles/StyledForm/StyledButton";
import StyledError from "../../components/styles/StyledForm/StyledError";
import StyledLink from "../../components/styles/StyledLink";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $newPassword: String!
    $confirmNewPassword: String!
    $token: String!
  ) {
    resetPassword(
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
      token: $token
    )
  }
`;

const PasswordReset = ({ token }) => {
  return (
    <Mutation mutation={RESET_PASSWORD_MUTATION}>
      {(resetPassword, { data, error, loading }) => (
        <>
          <Formik
            initialValues={{ newPassword: "", confirmNewPassword: "" }}
            validate={values => {
              let errors = {};
              // New Password check
              if (isEmpty(values.newPassword, { ignore_whitespace: true })) {
                errors.newPassword = "Required";
              } else if (values.newPassword.includes(" ")) {
                errors.newPassword = "White spaces not allowed";
              } else if (!isLength(values.newPassword, { min: 8, max: 16 })) {
                errors.newPassword = "Password must be between 8 and 16 chars";
              }
              // Confirm new Password check
              if (
                isEmpty(values.confirmNewPassword, { ignore_whitespace: true })
              ) {
                errors.confirmNewPassword = "Required";
              } else if (values.confirmNewPassword !== values.newPassword) {
                errors.confirmNewPassword = "Passwords don't match";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await resetPassword({
                  variables: {
                    newPassword: values.newPassword,
                    confirmNewPassword: values.confirmNewPassword,
                    token
                  }
                });
              } catch (e) {
                setSubmitting(false);
              }
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values
            }) => (
              <StyledContainer modalIsOpened={data}>
                <StyledForm
                  title="Password reset"
                  handleSubmit={handleSubmit}
                  method="POST"
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
                    name="newPassword"
                    label="New Password"
                    type="password"
                    value={values.newPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {errors.newPassword &&
                    touched.newPassword &&
                    errors.newPassword && (
                      <StyledError>{errors.newPassword}</StyledError>
                    )}
                  <StyledInput
                    name="confirmNewPassword"
                    label="Confirm new Password"
                    type="password"
                    value={values.confirmNewPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {errors.confirmNewPassword &&
                    touched.confirmNewPassword &&
                    errors.confirmNewPassword && (
                      <StyledError>{errors.confirmNewPassword}</StyledError>
                    )}
                  {!errors.newPassword &&
                    !errors.confirmNewPassword &&
                    error &&
                    error.graphQLErrors && (
                      <StyledError errors={error.graphQLErrors} />
                    )}
                </StyledForm>
              </StyledContainer>
            )}
          </Formik>
          <Modal showModal={data}>
            You've successfully changed your password. Please{" "}
            <StyledLink href="/login">Login</StyledLink> now
          </Modal>
        </>
      )}
    </Mutation>
  );
};

PasswordReset.getInitialProps = ({ query }) => {
  return { token: query.token };
};

export default PasswordReset;
