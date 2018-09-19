import React, { Component } from "react";
import Post from "./Post/Post";
import Feed from "./Post/Feed";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>
            Hello,{" "}
            {this.props.user
              ? this.props.user.username
              : "Welcome to NAME, log in and share your music!"}
            !
          </h1>
        </div>
        {this.props.user && <Post />}
        {this.props.user && <Feed />}
      </div>
    );
  }
}

export default Home;
