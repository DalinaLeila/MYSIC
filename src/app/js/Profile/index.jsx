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

    this._handleClick = this._handleClick.bind(this);
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
    console.log("PROPS", this.props.user); //my profile
    console.log("STATE", this.state.user); //friends profile
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
        <UserPosts
          posts={this.state.posts}
          user={this.state.user}
          loggedInUser={this.props.user}
          handleClick={this._handleClick}
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
  _handleClick(e, el) {
    // console.log(el);
    api
      .post(`/api/music/post/delete`, {
        el
      })
      .then(data => {
        this.props.history.push("/");
      });
  }
}

export default withRouter(Profile);
