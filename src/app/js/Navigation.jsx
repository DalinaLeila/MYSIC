import React from "react";
import { Link } from "react-router-dom";
import Notifications from "./Post/Notifications";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Navigation = props => {
  return (
    <Navbar className="navigation" dark expand="md">
      <NavbarBrand>
        <Link className="link nav-link nav-logo" to="/">
          <img src={require("../assets/headphones.png")} width="50px" /> Musicly
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={props.toggle} />
      <Collapse isOpen={props.open} navbar>
        <Nav className="ml-auto" navbar>
          {props.user && (
            <span className="navChild">
              <NavItem>
                <UncontrolledDropdown direction="left" nav inNavbar>
                  <DropdownToggle nav>
                    <img
                      src={require("../assets/notification.png")}
                      width="40px"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Notifications />
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <Link className="link nav-link" to="/profile">
                  <img
                    src={props.user.profilePicture}
                    width="40px"
                    className="nav-profile"
                  />
                </Link>
              </NavItem>

              <NavItem>
                <Link className="link nav-link" to="/discover">
                  <img src={require("../assets/compass.png")} width="40px" />
                </Link>
              </NavItem>
            </span>
          )}
          {props.user ? (
            <NavItem>
              <Link className="link nav-link" to="/auth/logout">
                Log Out{" "}
              </Link>
            </NavItem>
          ) : (
            <span className="navChild">
              <NavItem>
                <Link className="link nav-link" to="/auth/sign-in">
                  Sign In{" "}
                </Link>
              </NavItem>
              <NavItem>
                <Link className="link nav-link" to="/auth/sign-up">
                  Sign Up{" "}
                </Link>
              </NavItem>
            </span>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
