import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
  background-color: ${props => props.theme.colors.strongBlue};
  border: 1px solid ${props => props.theme.colors.strongPink};
  border-radius: 10px;
  width: ${props => props.width};
  margin: 10px auto;
  text-align: center;
  overflow: hidden;

  animation: fadeIn ${props => props.fadeInTime};

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Jumbotron = ({ children, width, fadeInTime }) => {
  return (
    <Container width={width} fadeInTime={fadeInTime}>
      {children}
    </Container>
  );
};

export default Jumbotron;
