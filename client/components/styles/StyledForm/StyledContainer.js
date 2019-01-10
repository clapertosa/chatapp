import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
  max-width: 50rem;
  width: 80%;
  filter: ${props => (props.showModal ? "blur(5px)" : null)};
`;

const StyledContainer = ({ children, modalIsOpened }) => {
  return <Container showModal={modalIsOpened}>{children}</Container>;
};

export default StyledContainer;
