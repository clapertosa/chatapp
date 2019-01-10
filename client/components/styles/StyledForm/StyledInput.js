import styled from "styled-components";

const Container = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin: 10px auto;
  width: 100%;
  height: 30px;
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};

  &[type="text"],
  &[type="email"],
  &[type="password"] {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.lightPink};
    background: ${({ theme: { colors } }) => colors.lightBlue};
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.3rem;
`;

const StyledInput = ({
  label,
  autoComplete,
  autoFocus,
  type,
  name,
  value,
  placeholder,
  required,
  handleChange,
  handleBlur
}) => {
  return (
    <Container>
      <Label htmlFor={type}>{label}</Label>
      <Input
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        type={type}
        name={name || type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Container>
  );
};

export default StyledInput;
