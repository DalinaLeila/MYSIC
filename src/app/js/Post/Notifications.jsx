import React, { Component } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.checkBackend = this.checkBackend.bind(this);
  }

  checkBackend() {
    api
      .get(`/api/profile/user/notify`)
      .then(data => {
        this.setState({
          list: data
        });
        console.log("list", this.state.list);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // componentDidMount() {
  //   this.checkBackend();
  //   this.intervalId = setInterval(() => {
  //     return this.checkBackend()
  //   }, 5000)
  // }
  // componentWillUnmount() {
  //   clearInterval(this.intervalId)
  // }
  render() {
    let notePosts = this.state.list.map((post, index) => {
      return (
        <DropdownItem key={index}>
          <Link to={`profile/${post.othersName}`}> {post.othersName}</Link>{" "}
          {post.kind}s your post
        </DropdownItem>
      );
    });
    return <div>{notePosts}</div>;
  }
}

export default Notifications;
