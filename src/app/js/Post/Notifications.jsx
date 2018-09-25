import React, { Component } from 'react';
import api from "../utils/api";

import {
  
  DropdownItem
} from "reactstrap";

class Notifications extends Component {
  constructor(props) {
  super(props)
  this.state = {
    list: []
  }
}

componentDidMount() {
  this.intervalId = setInterval(checkBackend, 20000

  )
  function checkBackend() {
    api
      .get(`/api/profile/user-profile/notify`)
      .then(data => {
        this.setState({
          list: data,

        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
componentWillUnmount() {
  clearInterval(this.intervalId)
}
render() {
  return (
    <DropdownItem>
     {this.state.list}
    </DropdownItem>
  );
}
}

export default Notifications;