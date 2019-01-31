import styled from "styled-components";

const Container = styled.div`
  display: ${({ showBackdrop }) => (showBackdrop ? "block" : "none")};
  top: ${({ theme: { mobileNavbarHeight }, usersSideDrawer }) =>
    !usersSideDrawer ? mobileNavbarHeight : 0};
  left: 0;
  position: ${({ usersSideDrawer }) =>
    usersSideDrawer ? "absolute" : "fixed"};
  width: 100%;
  height: ${({ theme: { mobileNavbarHeight }, usersSideDrawer }) =>
    !usersSideDrawer ? `calc(100% - ${mobileNavbarHeight})` : "100%"};
  background-color: rgb(0, 0, 0, 0.534);
  z-index: ${props => (props.zIndex ? props.zIndex : "-100")};
`;

const Backdrop = ({
  showBackdrop,
  closeSideDrawer,
  zIndex,
  usersSideDrawer
}) => {
  let touchStart, touchEnd;
  return (
    <Container
      showBackdrop={showBackdrop}
      zIndex={zIndex}
      usersSideDrawer={usersSideDrawer}
      onClick={closeSideDrawer}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() => (touchEnd < touchStart ? closeSideDrawer() : null)}
    />
  );
};

export default Backdrop;
