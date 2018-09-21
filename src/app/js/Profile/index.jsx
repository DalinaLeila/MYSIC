import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import api from "../utils/api";
import UserPosts from "./UserPosts";
import Feed from "../Post/Feed";

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
    // console.log("PROPS", this.props.user); //my profile
    // console.log("STATE", this.state.user); //friends profile
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection
    if (this.state.loading) return <h1>Loading</h1>;

    const isFollowing = this.props.user.following.includes(
      this.state.user.username
    );

    return (
      <div className="container">
        <img
          src={this.state.user.profilePicture}
          alt=""
          width="200px"
          className="profilepicture"
        />
        <br />
        <br />
        {this.state.user.username}
        {this.props.user.username !== this.state.user.username && (
          <button
            onClick={e => this.handleFollowClick(e, this.state.user.username)}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
        <div>
          <h3>Your Jam:</h3>
        </div>
        <Feed
          list={this.state.posts}
          user={this.state.user}
          loggedInUser={this.props.user}
          setPost={this.props.setPost}
        />
      </div>
    );
  }

  handleFollowClick(e, followUsername) {
    api
      .post(`/api/profile/user-profile/${followUsername}/follow`)
      .then(data => {
        localStorage.setItem("identity", data.token);
        this.props.setUser();
      });
  }
}

export default withRouter(Profile);
