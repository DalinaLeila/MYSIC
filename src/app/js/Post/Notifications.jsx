import React, { Component } from 'react';
const express = require("express");
const router = express.Router();

class Notifications extends Component {
  constructor(props){
    super(props)
this.state={
list: []
}
  }

  componentDidUpdate() {

    
    // router
    //   .get(`/api/profile/user-profile/notify`)
    //   .then(data => {
    //     this.setState({
    //       list: data,
    //       loading: false
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Notifications;