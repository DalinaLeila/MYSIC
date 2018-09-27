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
          <img src={require("../assets/headphones.png")} width="50px" />{" "}
          {"    "}
          MYSIC
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={props.toggle} />
      <Collapse isOpen={props.open} navbar>
        <Nav className="ml-auto" navbar>
          {props.user && (
            <span className="navChild">
              <NavItem>
                <Link className="link nav-link" to="/profile">
                  <div className="row-flex">
                    <div>
                      <img
                        src={props.user.profilePicture}
                        width="55px"
                        className="nav-profile"
                      />
                    </div>
                    <div className="nav-username">
                      <h4>{props.user.username}</h4>
                    </div>
                  </div>
                </Link>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown direction="left" nav inNavbar>
                  <DropdownToggle nav>
                    <img
                      src={require("../assets/notification.png")}
                      width="40px"
                      onClick={e => props.handleNoteClick(e)}
                    />
                    <h5>{props.number!=0 && props.number>0 &&props.number}</h5>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="scrollbar nav-scroll" id="style-1">
                      <Notifications list={props.list} />
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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
                <div className="column-flex">
                  <div>
                    <img
                      src={require("../assets/exit.png")}
                      width="33px"
                      className="icon-logOut"
                    />
                  </div>
                  <div>
                    <p>Exit</p>
                  </div>
                </div>
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
