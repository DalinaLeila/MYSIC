import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import api from "../utils/api";
import UserPosts from "./UserPosts";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: {},
      loading: true
    };
  }

  componentDidMount() {
    api
      .get(
        `/api/profile/user-profile${
          this.props.match.params.username
            ? `/${this.props.match.params.username}`
            : ""
        }`
      )
      .then(data => {
        console.log(data);
        this.setState({
          posts: data.posts,
          user: data.user,
          loading: false
        });
      });
  }

  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection
    if (this.state.loading) return <h1>Loading</h1>;
    return (
      <div className="container">
        <img
          src={this.props.user.profilePicture}
          alt=""
          width="200px"
          className="profilepicture"
        />
        <br />
        <br />
        {this.state.user.username}
        <button onClick={this.handleClick}>Follow</button> {/* to do */}
        <div>
          <h3>Your Jam:</h3>
        </div>
        <UserPosts posts={this.state.posts} user={this.state.user} />
      </div>
    );
  }

  //to do!
  handleClick() {
    console.log("Click");
  }
}

export default withRouter(Profile);
