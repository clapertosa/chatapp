import styled from "styled-components";

const Container = styled.div`
  width: ${({ width }) => (width ? width : "100%")};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const getAppropriateCat = () => {
  // :3 🐱
  const date = new Date();
  if (date.getMonth() === 11 || (date.getMonth() === 0 && date.getDate() < 7)) {
    return "/static/images/nyan_cat_christmas.gif";
  }
  return "/static/images/nyan_cat.gif";
};

const Spinner = ({ width }) => {
  return (
    <Container width={width}>
      <img src={getAppropriateCat()} />
    </Container>
  );
};

export default Spinner;
