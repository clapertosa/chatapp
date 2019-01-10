import styled from "styled-components";
import StyledContainer from "../styles/StyledForm/StyledContainer";
import StyledForm from "../styles/StyledForm/StyledForm";

const Container = styled.div``;

const Profile = () => {
  return (
    <Container>
      <StyledContainer>
        <StyledForm title="Change Nickname" />
      </StyledContainer>
    </Container>
  );
};

export default Profile;
