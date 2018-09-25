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
    <div>
      <Navbar className="navigation" dark expand="md">
        <NavbarBrand>
          <Link className="link nav-link" to="/">
            Musicly{" "}
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={props.toggle} />
        <Collapse isOpen={props.open} navbar>
          <Nav className="ml-auto" navbar>
            {props.user && (
              <span className="navChild">
                <NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                      Notifications
                </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>
                      <Notifications />
                    
                  </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <Link className="link nav-link" to="/profile">
                    Profile{" "}
                  </Link>
                </NavItem>

                <NavItem>
                  <Link className="link nav-link" to="/discover">
                    Discover{" "}
                  </Link>
                </NavItem>
              </span>
            )}
            {props.user ? (
              <NavItem>
                <Link className="link nav-link" to="/auth/logout">
                  Logout{" "}
                </Link>
              </NavItem>
            ) : (
                <span className="navChild">
                  <NavItem>
                    <Link className="link nav-link" to="/auth/sign-in">
                      Sign in{" "}
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
    </div>
  );
};

export default Navigation;
