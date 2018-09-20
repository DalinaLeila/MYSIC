import React, { Component } from "react";
import Post from "./Post/Post";
import Feed from "./Post/Feed";

class Home extends Component {
  // componentDidMount() {
  //   api
  //     .get("/api/music/feed")
  //     .then(data => {
  //       this.setState({
  //         list: data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }


  render() {
    return (
      <div>
        <div className="container">
          <h1>
            Hello,{" "}
            {this.props.user
              ? this.props.user.username
              : "Welcome to Musicly, log in and share your music!"}
            !
          </h1>
        </div>
        {this.props.user && <Post />}
        <Feed />
      </div>
    );
  }

  // handleSubmit() {
  //   api
  //     .post(`/api/music/post`, {
  //       caption: this.state.caption,
  //       song: this.state.song
  //     })
  //     .then(data => {
  //       // console.log("working");
  //       console.log(data)

  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

}

export default Home;
