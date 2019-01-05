import { Formik } from "formik";
import Link from "next/link";
import { isEmail, normalizeEmail } from "validator";
import StyledContainer from "../../styles/StyledForm/StyledContainer";
import StyledForm from "../../styles/StyledForm/StyledForm";
import StyledInput from "../../styles/StyledForm/StyledInput";
import StyledError from "../../styles/StyledForm/StyledError";
import StyledButton from "../../styles/StyledForm/StyledButton";

const LoginForm = () => {
  return (
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        isSubmitting,
        values,
        errors,
        touched,
        dirty,
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
                <StyledButton type="submit" disabled={isSubmitting}>
                  Submit
                </StyledButton>
                <Link href="/password-reset">
                  <a>Forgot your password?</a>
                </Link>
              </>
            }
          >
            <StyledInput
              autoFocus
              autoComplete="off"
              label="Email"
              type="text"
              name="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {((errors.email && touched.email) ||
              (errors.email && dirty.email)) && (
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
          </StyledForm>
        </StyledContainer>
      )}
    </Formik>
  );
};

export default LoginForm;
