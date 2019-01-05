import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
  max-width: 50rem;
  width: 80%;
`;

const StyledContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default StyledContainer;
