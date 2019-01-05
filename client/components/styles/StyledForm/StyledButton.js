import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme: { colors } }) => colors.lightBlue};
  color: ${({ theme: { colors } }) => colors.strongPink};
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  padding: 5px 20px;
  text-transform: uppercase;
  font-size: 1.3rem;

  &:active {
    background-color: ${({ theme: { colors } }) => colors.strongBlue};
  }
`;

const StyledButton = ({ children, type, disabled }) => {
  return (
    <Button type={type} disabled={disabled}>
      {children}
    </Button>
  );
};

export default StyledButton;
