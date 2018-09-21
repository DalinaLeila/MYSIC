import React, { Component } from "react";
import Feed from "./Post/Feed";
import api from "./utils/api";

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      list: []
    };
    this._updatePost = this._updatePost.bind(this);
    this._deletePost = this._deletePost.bind(this);
  }
  componentDidMount() {
    api
      .get(`/api/music/feed`)
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
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    return (
      <div>
        {this.props.user && (
          <Feed
            loggedInUser={this.props.user}
            list={this.state.list}
            user={this.props.user}
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
}

export default Discover;
