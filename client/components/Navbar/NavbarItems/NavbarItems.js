import styled from "styled-components";
import NavbarItem from "./NavbarItem/NavbarItem";
import Logo from "../../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import User from "../../../hoc/User/User";

const ContainerDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0%;

  @media (min-width: ${props => props.theme.mediaQuery.minWidth}) {
    justify-content: space-evenly;
  }
`;

const ContainerMobile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  margin: 30px auto;
  padding: 0%;
`;

const Left = styled.div`
  display: flex;
  margin: auto 10px;
  height: 100%;
`;

const Right = styled.div`
  display: none;
  margin: auto 10px;
  height: 100%;

  @media (min-width: ${props => props.theme.mediaQuery.minWidth}) {
    display: ${props => (props.sideDrawer ? "none" : "flex")};
  }
`;

const NavbarItems = ({ sideDrawer, showSideDrawerToggle }) => {
  return sideDrawer ? (
    <User>
      {({ data: { currentUser } }) => (
        <ContainerMobile>
          <NavbarItem mobile href={`/${currentUser ? "profile" : "login"}`}>
            {currentUser ? currentUser.nickname : "Login"}
          </NavbarItem>
          <NavbarItem
            mobile
            href={`/${currentUser ? "logout" : "registration"}`}
          >
            {currentUser ? "Logout" : "Register"}
          </NavbarItem>
        </ContainerMobile>
      )}
    </User>
  ) : (
    <User>
      {({ data: { currentUser } }) => (
        <ContainerDesktop>
          <Left>
            <Logo navbar />
          </Left>
          <Right>
            <NavbarItem href={`/${currentUser ? "profile" : "login"}`}>
              {currentUser ? currentUser.nickname : "Login"}
            </NavbarItem>
            <NavbarItem href={`/${currentUser ? "logout" : "registration"}`}>
              {currentUser ? "Logout" : "Register"}
            </NavbarItem>
          </Right>
          <DrawerToggle toggle={showSideDrawerToggle} />
        </ContainerDesktop>
      )}
    </User>
  );
};

export default NavbarItems;
