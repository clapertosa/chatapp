import styled from "styled-components";

const Container = styled.div`
  display: ${props => (props.showBackdrop ? "block" : "none")};
  top: ${props => props.theme.navbarHeight};
  left: 0;
  position: absolute;
  width: 100%;
  height: calc(100vh - ${props => props.theme.navbarHeight});
  background-color: rgb(0, 0, 0, 0.534);
  z-index: -100;
`;

const Backdrop = ({ showBackdrop, closeSideDrawer }) => {
  let touchStart, touchEnd;
  return (
    <Container
      showBackdrop={showBackdrop}
      onClick={closeSideDrawer}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() => (touchEnd < touchStart ? closeSideDrawer() : null)}
    />
  );
};

export default Backdrop;
