import React, { Component } from 'react';

class Notifications extends Component {
  constructor(props){
    super(props)
this.state={
list: []
}
  }

  componentDidMount() {
    router
      .get(`/api/profile/user-profile/notify`)
      .then(data => {
        this.setState({
          list: data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Notifications;