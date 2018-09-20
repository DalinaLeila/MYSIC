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
            <div className="user">
              <img
                src={el.profilePicture}
                width="30px"
                className="profilepicture"
              />
              {el.username}
            </div>
          </Link>
          <div className="usercomment">"{el.caption}"</div>
          <div className="songinfo">
            <img src={el.song.album.images[0].url} alt="" width="50px" />
            {el.song.artists[0].name} - {el.song.name}
            <div className="audio">
              <Music url={el.song} />
            </div>
            {el.created_at}
          </div>
          {el.username === this.props.loggedInUser.username && (
            <img
              onClick={e => this.props.handleClick(e, el)}
              src="/../../assets/cross.png" // image is not showing properly at the moment!!
              width="40px"
            />
          )}
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
}

export default UserPosts;
