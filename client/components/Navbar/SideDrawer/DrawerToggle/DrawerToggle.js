import styled from "styled-components";

const Container = styled.div`
  display: ${props => (props.sideDrawer ? "none" : "block")};
  cursor: pointer;

  i {
    font-size: 2rem;
  }

  @media (min-width: ${props => props.theme.mediaQuery.minWidth}) {
    display: none;
    i {
      font-size: 2.7rem;
    }
  }
`;

const DrawerToggle = ({ sideDrawer, toggle }) => {
  return (
    <Container sideDrawer={sideDrawer} onClick={toggle}>
      <i className="icon-menu" />
    </Container>
  );
};

export default DrawerToggle;
