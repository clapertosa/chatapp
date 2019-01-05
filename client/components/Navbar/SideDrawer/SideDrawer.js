import styled from "styled-components";
import NavbarItems from "../NavbarItems/NavbarItems";

const Container = styled.div`
  position: fixed;
  top: ${props => props.theme.navbarHeight};
  border-right: 1px solid ${props => props.theme.colors.strongPink};
  left: 0;
  width: 70%;
  height: calc(100% - ${props => props.theme.navbarHeight});
  background-color: ${props => props.theme.colors.strongBlue};
  background-image: url("/static/images/balloons.svg");
  background-position: center;
  background-position-y: bottom;
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 0.2s ease-out;

  transform: ${props =>
    props.showSideDrawer ? "translateX(0)" : "translateX(-200%)"};

  @media (min-width: ${props => props.theme.mediaQuery.minWidth}) {
    display: none;
  }
`;

const SideDrawer = ({ showSideDrawer, closeSideDrawer }) => {
  let touchStart, touchEnd;
  return (
    <Container
      showSideDrawer={showSideDrawer}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() => (touchEnd < touchStart ? closeSideDrawer() : null)}
    >
      <NavbarItems sideDrawer />
    </Container>
  );
};

export default SideDrawer;
