import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../../styles/StyledForm/StyledForm";
import User, { CURRENT_USER_QUERY } from "../../../hoc/User/User";
import StyledError from "../../styles/StyledForm/StyledError";
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

const AvatarInput = styled.div`
  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      ::after {
        content: "Upload a new Avatar";
        position: absolute;
        font-weight: bold;
        font-size: 1.5rem;
        color: ${({ theme: { colors } }) => colors.strongPink};
        text-shadow: 1px 1px 1px black;
      }
      img {
        filter: blur(3px) grayscale(100%) brightness(50%);
        background-color: gray;
      }
    }
  }

  input {
    display: none;
  }

  img {
    border-radius: ${({ isLoading }) => (isLoading ? 0 : "50%")};
    width: 200px;
    height: auto;
    transition: all 0.2s;
  }
`;

const CHANGE_AVATAR_MUTATION = gql`
  mutation CHANGE_AVATAR_MUTATION($path: String!) {
    changeAvatar(path: $path)
  }
`;

class Avatar extends Component {
  state = {
    loading: false,
    image: null,
    error: null
  };

  uploadAvatar = async e => {
    this.setState({ loading: true, error: null });
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "chat-app");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/wolf91/image/upload",
      { method: "POST", body: data }
    );

    if (res.status === 400) {
      this.setState({ error: "Only images files are allowed", loading: false });
    }

    const image = await res.json();
    this.setState({ image: image.secure_url });
  };

  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <Mutation
            mutation={CHANGE_AVATAR_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(changeAvatar, { data, error, loading }) => (
              <Container show={this.props.show}>
                <StyledForm noBorder title="Change Avatar">
                  <AvatarInput isLoading={this.state.loading || loading}>
                    <label htmlFor="fileInput">
                      {this.state.loading || loading ? (
                        <Spinner width="200px" />
                      ) : (
                        <img src={currentUser.avatar} alt="Your avatar" />
                      )}
                    </label>
                    <input
                      id="fileInput"
                      name="fileInput"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      onChange={async e => {
                        await this.uploadAvatar(e);
                        await changeAvatar({
                          variables: { path: this.state.image }
                        });
                        !loading ? this.setState({ loading: false }) : null;
                      }}
                    />
                  </AvatarInput>
                  {this.state.error ? (
                    <StyledError>{this.state.error}</StyledError>
                  ) : null}
                </StyledForm>
              </Container>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default Avatar;
