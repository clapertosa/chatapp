import styled from "styled-components";

const Message = styled.div`
  font-weight: bold;
  color: #5fd869;
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledSuccess = ({ children }) => {
  return <Message>{children}</Message>;
};

export default StyledSuccess;
