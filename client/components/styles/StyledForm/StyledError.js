import styled from "styled-components";

const Error = styled.div`
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.mediumPink};
`;

const StyledError = ({ children, errors }) => {
  if (errors) {
    return (
      <Error>
        {errors.map(error => {
          return error.error.message;
        })}
      </Error>
    );
  }
  return <Error>{children}</Error>;
};

export default StyledError;
