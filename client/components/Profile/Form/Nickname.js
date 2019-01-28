import React, { Component } from "react";
import User, { CURRENT_USER_QUERY } from "../../../hoc/User/User";
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

const CHANGE_NICKNAME_MUTATION = gql`
  mutation CHANGE_NICKNAME_MUTATION($nickname: String!) {
    changeNickname(nickname: $nickname)
  }
`;

class Nickname extends Component {
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
              mutation={CHANGE_NICKNAME_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(changeNickname, { data, error, loading }) => (
                <Formik
                  initialValues={{
                    nickname: currentUser ? currentUser.nickname : ""
                  }}
                  validate={values => {
                    this.setState({ successMessage: null, errorMessage: null });
                    let errors = {};

                    if (isEmpty(values.nickname, { ignore_whitespace: true })) {
                      errors.nickname = "Required";
                    } else if (
                      values.nickname !== values.nickname.toLowerCase()
                    ) {
                      errors.nickname = "Nickname must be lowercase";
                    } else if (
                      !isLength(values.nickname, { min: 4, max: 16 })
                    ) {
                      errors.nickname =
                        "Nickname must be between 4 and 16 chars";
                    } else if (values.nickname.includes(" ")) {
                      errors.nickname = "White spaces not allowed";
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    this.setState({
                      successMessage: null,
                      errorMessage: null
                    });
                    try {
                      await changeNickname({
                        variables: { nickname: values.nickname }
                      });
                      this.setState({
                        successMessage: "Nickname successfully changed"
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
                      title="Change Nickname"
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
                        autoCapitalize="off"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="nickname"
                        type="text"
                        value={values.nickname}
                      />
                      {errors.nickname && (
                        <StyledError>{errors.nickname}</StyledError>
                      )}
                      {!errors.nickname && this.state.errorMessage && (
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

export default Nickname;
