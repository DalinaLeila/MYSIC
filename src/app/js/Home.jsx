import React, { Component } from "react";
import Post from "./Post/Post";
import Feed from "./Post/Feed";
import api from "./utils/api";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      list: [],

      loading: true
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateComment = this._updateComment.bind(this);
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
    if (this.props.user)
      if (this.state.loading) {
        return <div>loading ...</div>;
      }
    return (
      <div className="main">
        <div className="container">
          <h1>
            Hello,{" "}
            {this.props.user
              ? this.props.user.username
              : "Welcome to Musicly, log in and share your music!"}
            !
          </h1>
        </div>

        {this.props.user && (
          <Post handleSubmit={this._handleSubmit} error={this.state.error} />
        )}
        {this.props.user && (
          <Feed
            loggedInUser={this.props.user}
            list={this.state.list}
            user={this.props.user}
            updateComment={this._updateComment}
            updatePost={this._updatePost}
            deletePost={this._deletePost}
          />
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

  _updateComment(post) {
    this.setState({
      list: this.state.list.map(el => {
        if (el.id !== post._id) return el;
        return post;
      })
    });
  }
}

export default Home;
