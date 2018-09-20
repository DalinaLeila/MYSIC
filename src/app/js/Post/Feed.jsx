import React, { Component } from "react";
import api from "../utils/api";
import Music from "./Music";
import { Button } from "reactstrap";

import { Link } from "react-router-dom";

class Feed extends Component {
//   constructor(props) {
//     super(props);
    // this.state = {
    //   list: []
    // };
//   }


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
    let feedPosts = this.state.list.map((post, index) => {
      console.log(post);

      return (
        <div key={index}>
          <div className="userpost">
            <Link to={`/profile/${post.username}`}>
              <div className="user">
                <img
                  src={post.profilePicture}
                  width="30px"
                  className="profilepicture"
                />
                {post.username}
              </div>
            </Link>
            <div className="usercomment">" {post.caption} "</div>
          </div>
          <div className="songinfo">
            <img src={post.song.album.images[0].url} width="50px" />
            {post.song.artists[0].name} - {post.song.name}
            <div className="audio">
              <Music url={post.song} />
            </div>
            {post.created_at}
          </div>
          <div className="social">
            <Button onClick={el => this.handleLikeClick(el, post._id)}>
              Like
            </Button>

            <Button>Save</Button>
          </div>
          <hr />
        </div>
      );
    });
    return <div>{feedPosts}</div>;
  }

  handleLikeClick(e, postId) {
    console.log(postId);
  }
}

export default Feed;
