import React, { Component } from "react";
import api from "../utils/api";
import Music from "./Music";

import { Dropdown, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import { Link } from "react-router-dom";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    let feedPosts = this.props.list.map((post, index) => {
      // console.log("USER", this.props.user.username); //YOU
      // console.log("POST", post);
      const isLiking = post.likedByUser.includes(this.props.user.username);
      let likes = post.likedByUser.map((name, index) => {
        return (
          <Link key={index} to={`/profile/${name}`}>
            <li>{name}</li>
          </Link>
        );
      });
      return (
        <div key={index} className="postbody">
          <div className="userpost">
            <Link to={`/profile/${post.username}`}>
              <div className="user">
                <img
                  src={post.profilePicture}
                  width="40px"
                  className="profilepicture"
                />
                <h5>{post.username}</h5>
              </div>
            </Link>
            <div className="usercomment">
              <h3>" {post.caption} "</h3>
            </div>
            {post.username === this.props.loggedInUser.username && (
              <img
                onClick={e => this.handleDeleteClick(e, post)}
                src={require("../../assets/cross.png")}
                width="20px"
              />
            )}
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
            <img
              onClick={el =>
                this.handleLikeClick(el, this.props.user.username, post._id)
              }
              src={
                isLiking
                  ? require("../../assets/likePurple.png")
                  : require("../../assets/likeBlack.png")
              }
            />
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                tag="span"
                onClick={this.toggle}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
              >
                {post.likedByUser.length}
              </DropdownToggle>
              <DropdownMenu>
                <div>{likes}</div>
              </DropdownMenu>
            </Dropdown>
          </div>
          <hr />
        </div>
      );
    });
    return <div>{feedPosts}</div>;
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleLikeClick(el, likedUser, postId) {
    api
      .post("/api/music/post/like", {
        likedUser,
        postId
      })
      .then(result => {
        this.props.updatePost(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDeleteClick(e, el) {
    api
      .post(`/api/music/post/delete`, {
        el
      })
      .then(result => {
        this.props.deletePost(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Feed;
