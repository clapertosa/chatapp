import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme: { colors } }) => colors.lightBlue};
  color: ${({ theme: { colors } }) => colors.strongPink};
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  padding: 5px 20px;
  margin: ${props => props.margin};
  text-transform: uppercase;
  font-size: 1.3rem;
  max-width: 130px;

  &:active {
    background-color: ${({ theme: { colors } }) => colors.strongBlue};
  }
`;

const StyledButton = ({ name, clicked, children, type, margin, disabled }) => {
  return (
    <Button
      onClick={clicked}
      name={name}
      type={type}
      margin={margin}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
