import Head from "next/head";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import { isEmail, normalizeEmail } from "validator";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import StyledContainer from "../../components/styles/StyledForm/StyledContainer";
import StyledForm from "../../components/styles/StyledForm/StyledForm";
import StyledInput from "../../components/styles/StyledForm/StyledInput";
import StyledButton from "../../components/styles/StyledForm/StyledButton";
import StyledError from "../../components/styles/StyledForm/StyledError";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

const NEW_PASSWORD_MUTATION = gql`
  mutation NEW_PASSWORD_MUTATION($email: String!) {
    newPassword(email: $email)
  }
`;

const NewPassword = () => {
  return (
    <Mutation mutation={NEW_PASSWORD_MUTATION}>
      {(newPassword, { error, data, loading }) => (
        <>
          <Head>
            <title>Chat App 🎈 | Forgot password 🤕</title>
          </Head>
          <Formik
            initialValues={{ email: "" }}
            validate={values => {
              let errors = {};
              if (!isEmail(normalizeEmail(values.email))) {
                errors.email = "Invalid email";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await newPassword({ variables: { email: values.email } });
              } catch (e) {
                setSubmitting(false);
              }
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
              values
            }) => (
              <StyledContainer modalIsOpened={data}>
                <StyledForm
                  title="Password reset"
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
                    label="Email"
                    name="email"
                    type="email"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email ? (
                    <StyledError>{errors.email}</StyledError>
                  ) : null}
                  {!errors.email && error && error.graphQLErrors ? (
                    <StyledError errors={error.graphQLErrors} />
                  ) : null}
                </StyledForm>
              </StyledContainer>
            )}
          </Formik>
          <Modal showModal={data}>
            An email with reset password has been sent. Please check your emails
            to continue.
          </Modal>
        </>
      )}
    </Mutation>
  );
};

NewPassword.getInitialProps = async context => {
  const { user } = await checkLoggedIn(context.apolloClient);

  if (user.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default NewPassword;
