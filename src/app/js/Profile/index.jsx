import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import api from "../utils/api";
import Feed from "../Post/Feed";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: {},
      loading: true
    };
    this._updatePost = this._updatePost.bind(this);
    this._deletePost = this._deletePost.bind(this);
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
      <div className="profile">
        <div className="profile-header">
          <img
            src={this.state.user.profilePicture}
            alt=""
            width="200px"
            className="profile-picture"
          />
          <br />
          <br />
          <h1>{this.state.user.username}</h1>
          {this.props.user.username !== this.state.user.username && (
            <button
              className="profile-follow"
              onClick={e => this.handleFollowClick(e, this.state.user.username)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div className="feed">
          <Feed
            list={this.state.posts}
            user={this.state.user}
            loggedInUser={this.props.user}
            updatePost={this._updatePost}
            deletePost={this._deletePost}
          />
        </div>
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

  _updatePost(post) {
    this.setState({
      posts: this.state.posts.map(el => {
        if (el._id !== post._id) return el;
        return post;
      })
    });
  }

  _deletePost(post) {
    this.setState({
      posts: this.state.posts.filter(el => {
        if (el._id !== post._id) return true;
        return false;
      })
    });
  }
}

export default withRouter(Profile);
