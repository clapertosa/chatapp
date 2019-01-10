import styled from "styled-components";
import Backdrop from "../UI/Backdrop/Backdrop";

const Container = styled.div`
  top: ${props => props.theme.navbarHeight};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - ${props => props.theme.navbarHeight});
  width: 100%;
  text-align: center;
  z-index: 10;
  animation: entrance 1s;

  h1 {
    margin: auto;
    width: 70%;
  }

  @keyframes entrance {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Modal = ({ children, showModal }) => {
  return showModal ? (
    <>
      <Container>
        <h1>{children}</h1>
      </Container>
      <Backdrop showBackdrop={showModal} zIndex="0" />
    </>
  ) : null;
};

export default Modal;
