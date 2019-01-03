import React, { Component } from "react";
import styled from "styled-components";
import NavbarItems from "./NavbarItems/NavbarItems";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";

const Container = styled.nav`
  width: 100%;
  height: 100%;
  margin: auto 20px;
`;

class Navbar extends Component {
  state = {
    showSideDrawer: false
  };

  showSideDrawerToggle = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <>
        <Container>
          <NavbarItems showSideDrawerToggle={this.showSideDrawerToggle} />
          <SideDrawer
            showSideDrawer={this.state.showSideDrawer}
            closeSideDrawer={this.closeSideDrawer}
          />
        </Container>
        <Backdrop
          showBackdrop={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawer}
        />
      </>
    );
  }
}

export default Navbar;
