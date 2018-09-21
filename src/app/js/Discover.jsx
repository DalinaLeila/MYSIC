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
            setPost={this.props.setPost}
          />
        )}
      </div>
    );
  }
}

export default Discover;
