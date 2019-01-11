import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
  max-width: 50rem;
  width: ${props => props.width || "80%"};
  filter: ${props => (props.showModal ? "blur(5px)" : null)};
`;

const StyledContainer = ({ children, modalIsOpened, width }) => {
  return (
    <Container showModal={modalIsOpened} width={width}>
      {children}
    </Container>
  );
};

export default StyledContainer;
