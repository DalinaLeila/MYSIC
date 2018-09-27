import React, { Component } from "react";
import Post from "./Post/Post";
import Feed from "./Post/Feed";
import api from "./utils/api";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      list: [],
      loading: true
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updatePost = this._updatePost.bind(this);
    this._deletePost = this._deletePost.bind(this);
  }
  componentDidMount() {
    api
      .get(`/api/music/feed/selected`)
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
    // console.log(this.props.user);
    if (this.props.user)
      if (this.state.loading) {
        return <div>loading ...</div>;
      }
    return (
      <div className="main">
        <div className="main-home-page">
          <h1>
            {this.props.user ? (
              ""
            ) : (
              <div>
                <img src={require("../assets/headphones (1).png")} />
                <h1 className="title-main">Welcome to Musicly</h1>
                <Link to="/auth/sign-up">
                  <button className="btn-home">Sign Up</button>
                </Link>
              </div>
            )}
          </h1>
        </div>
        {this.props.user && (
          <div className="profile-header home-header">
            <h1 className="shadow">
              Share your current jam {this.props.user.username}
              ...
            </h1>
            <Post handleSubmit={this._handleSubmit} error={this.state.error} />
            <div className="feed">
              <Feed
                loggedInUser={this.props.user}
                list={this.state.list}
                user={this.props.user}
                updatePost={this._updatePost}
                deletePost={this._deletePost}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  _updatePost(post) {
    this.setState({
      list: this.state.list.map(el => {
        if (el._id !== post._id) return el;
        return post;
      })
    });
  }
  _deletePost(post) {
    this.setState({
      list: this.state.list.filter(el => {
        if (el._id !== post._id) return true;
        return false;
      })
    });
  }

  _handleSubmit(caption, song) {
    api
      .post(`/api/music/post`, {
        caption,
        song
      })
      .then(data => {
        this.setState({
          list: [data].concat(this.state.list),
          error: ""
        });
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }
}

export default Home;
