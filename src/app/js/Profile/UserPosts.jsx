import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Music from "../Post/Music";
class UserPosts extends Component {
  render() {
    const mappedPosts = this.props.posts.map((el, index) => {
      return (
        <div key={index}>
          <Link to={`/profile/${el.username}`}>
            <img src={el.profilePicture} width="80px" />
            <h5>{el.username}</h5>
          </Link>
          <div>
            <h3>{el.caption}</h3>
          </div>
          <div>
            <img src={el.song.album.images[0].url} alt="" width="100px" />
            <h6>
              {el.song.name} by {el.song.artists[0].name}
            </h6>
            <Music url={el.song} />
          </div>
          <button onClick={e => this.handleClick(e, el)}>Delete</button>
          <hr />
        </div>
      );
    });
    return (
      <div>
        <div>{mappedPosts}</div>
      </div>
    );
  }
  handleClick(e, el) {
    console.log(el);
    api
      .post(`/api/music/post/delete`, {
        el
      })
      .then(data => {
        this.props.history.push("/");
      });
  }
}

export default UserPosts;
