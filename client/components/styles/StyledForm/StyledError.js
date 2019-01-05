import styled from "styled-components";

const Error = styled.div`
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.mediumPink};
`;

const StyledError = ({ children }) => {
  return <Error>{children}</Error>;
};

export default StyledError;
