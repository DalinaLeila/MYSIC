import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from "../utils/api";

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: null
    };
  }

  componentDidMount() {
    api.get(`/api/profile/user-profile`).then(data => {
      console.log(data);
      this.setState({
        posts: data.posts,
        user: data.user
      });
    });
  }

  render() {
    const mappedPosts = this.state.posts.map((el, index) => {
      return (
        <div key={index}>
          <a href={"/user-profile/" + el.username}>
            <div>
              <img src={el.profilePicture} width="80px" />
              <h5>{el.username}</h5>
            </div>
          </a>
          <div>
            <h3>{el.caption}</h3>
          </div>
          <div>
            <img src={el.song.album.images[0].url} alt="" width="100px" />
            <h6>
              {el.song.name} by {el.song.artists[0].name}
            </h6>
          </div>
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
