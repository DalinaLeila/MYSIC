import React, { Component } from 'react';
const express = require("express");
const router = express.Router();
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

class Notifications extends Component {
  constructor(props){
    super(props)
this.state={
list: []
}
  }

  // componentDidUpdate() {


  //   router
  //     .get(`/api/profile/user-profile/notify`)
  //     .then(data => {
  //       this.setState({
  //         list: data,
  //         loading: false
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  render() {
    return (
      <DropdownItem>
        Content
      </DropdownItem>
    );
  }
}

export default Notifications;