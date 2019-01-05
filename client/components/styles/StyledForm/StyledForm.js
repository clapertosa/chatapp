import styled from "styled-components";

const Form = styled.form`
  display: grid;
  grid-template-areas: "title" "input" "button";
  border: 1px solid ${({ theme: { colors } }) => colors.strongPink};
  background-color: ${({ theme: { colors } }) => colors.strongBlue};
  width: 100%;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px ${({ theme: { colors } }) => colors.strongPink};
`;

const TitleArea = styled.div`
  grid-area: title;
`;

const Title = styled.h1`
  color: ${({ theme: { colors } }) => colors.strongPink};
  margin: 0;
  padding: 0;
  text-align: center;
`;

const InputArea = styled.div`
  grid-area: input;
  display: flex;
  justify-content: center;
  flex-flow: column;
  flex-wrap: wrap;
`;

const ButtonArea = styled.div`
  grid-area: button;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;

  a {
    text-decoration: none;
    margin-top: 10px;
  }
`;

const StyledForm = ({ title, method, children, button, handleSubmit }) => {
  return (
    <Form method={method} onSubmit={handleSubmit}>
      <TitleArea>
        <Title>{title}</Title>
      </TitleArea>
      <InputArea>{children}</InputArea>
      <ButtonArea>{button}</ButtonArea>
    </Form>
  );
};

export default StyledForm;
