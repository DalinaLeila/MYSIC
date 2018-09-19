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
          {el.username === this.props.loggedInUser.username && (
            <button onClick={e => this.handleClick(e, el)}>Delete</button>
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

{
  /* <div key={index}>
<div className="userpost">
  <div className="user">
    <img
      src={post.profilePicture}
      width="30px"
      className="profilepicture"
    />
    {post.username}-
  </div>
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
  <a>
    <Button>Like</Button>
  </a>
  <a>
    <Button>Save</Button>
  </a>
</div>
<hr />
</div> */
}
