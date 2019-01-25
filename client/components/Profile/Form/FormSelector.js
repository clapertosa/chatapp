import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas: "avatar" "nickname" "email" "password" "form";
  margin: auto;
  width: 90%;
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;

  @media (min-width: 43rem) {
    grid-template-areas: "avatar nickname email password" "form form form form";
    width: 70%;
    max-width: 50rem;
  }
`;

const Tab = styled.div`
  grid-area: ${({ area }) => area};
  padding: 10px;
  background-color: ${({ selected, theme: { colors } }) =>
    selected ? colors.lightBlue : null};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  text-align: center;
  text-decoration: ${({ selected }) => (selected ? "underline" : null)};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.lightBlue};
  }

  @media (min-width: 43rem) {
    border-right: 1px solid ${({ theme: { colors } }) => colors.strongPink};
    border-left: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  }
`;

const Form = styled.div`
  grid-area: form;
`;

const FormSelector = ({ children, selected, onTabClickHandler }) => {
  return (
    <Container>
      <Tab
        name="avatar"
        area="avatar"
        selected={selected === "avatar"}
        onClick={e => onTabClickHandler(e)}
      >
        Avatar
      </Tab>
      <Tab
        name="nickname"
        area="nickname"
        selected={selected === "nickname"}
        onClick={e => onTabClickHandler(e)}
      >
        Nickname
      </Tab>
      <Tab
        name="email"
        area="email"
        selected={selected === "email"}
        onClick={e => onTabClickHandler(e)}
      >
        Email
      </Tab>
      <Tab
        name="password"
        area="password"
        selected={selected === "password"}
        onClick={e => onTabClickHandler(e)}
      >
        Password
      </Tab>
      <Form>{children}</Form>
    </Container>
  );
};

export default FormSelector;
