import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import StyledContainer from "../../styles/StyledForm/StyledContainer";
import StyledForm from "../../styles/StyledForm/StyledForm";
import StyledInput from "../../styles/StyledForm/StyledInput";
import StyledButton from "../../styles/StyledForm/StyledButton";
import StyledError from "../../styles/StyledForm/StyledError";

const CHANGE_CHATROOM_PASSWORD_MUTATION = gql`
  mutation CHANGE_CHATROOM_PASSWORD_MUTATION(
    $id: ID!
    $password: String!
    $confirmPassword: String!
  ) {
    changeChatroomPassword(
      id: $id
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

const PasswordForm = ({ chatroomId, isProtected }) => {
  return (
    <Mutation mutation={CHANGE_CHATROOM_PASSWORD_MUTATION}>
      {(changeChatroomPassword, { data, error, loading }) => {
        return (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validate={values => {
              let errors = {};
              // Password validation
              if (
                !values.password ||
                (values.password && values.password.trim().length === 0)
              ) {
                errors.password = "Required";
              }
              // Confirm Password validation
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords don't match";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await changeChatroomPassword({
                variables: {
                  id: chatroomId,
                  password: values.password,
                  confirmPassword: values.confirmPassword
                }
              });
              setSubmitting(false);
              history.go(0);
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
                  handleSubmit={handleSubmit}
                  title={isProtected ? "Change password" : "Set a password"}
                  method="POST"
                  button={
                    <StyledButton type="submit" disabled={isSubmitting}>
                      Submit
                    </StyledButton>
                  }
                >
                  <StyledInput
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="New Password"
                    name="password"
                    type="password"
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password && (
                    <StyledError>{errors.password}</StyledError>
                  )}
                  <StyledInput
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
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
};

export default PasswordForm;
