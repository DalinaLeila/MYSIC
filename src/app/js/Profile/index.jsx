import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from "../utils/api";
import UserPosts from "./UserPosts";

class Profile extends Component {
  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection
    return (
      <div className="container">
        <img src={this.props.user.profilePicture} alt="" width="200px" />
        <br />
        <br />
        {this.props.user.username}
        <button>Follow</button>
        <UserPosts />
      </div>
    );
  }
}

export default Profile;
