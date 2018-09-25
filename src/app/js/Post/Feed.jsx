import React, { Component } from "react";
import api from "../utils/api";
import Music from "./Music";
import Comments from "./Comments";
import { Dropdown, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import { Link } from "react-router-dom";

import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody
} from "reactstrap";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: "",
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    let feedPosts = this.props.list.map((post, index) => {
      // console.log("USER", this.props.user.username); //YOU
      console.log("POST", post);
      const isLiking = post.likedByUser.includes(this.props.user.username);
      let likes = post.likedByUser.map((name, index) => {
        return (
          <Link key={index} to={`/profile/${name}`}>
            <li>{name}</li>
          </Link>
        );
      });
      return (
        <div key={post._id}>
          <CardDeck className="containter-post">
            <Card>
              <div className="flex-comment">
                <Link to={`/profile/${post.username}`}>
                  <div className="user">
                    <img
                      src={post.profilePicture}
                      width="70px"
                      className="profilePicture"
                    />
                    <h5>{post.username}</h5>
                  </div>
                </Link>
                <div className="delete-img">
                  {post.username === this.props.loggedInUser.username && (
                    <img
                      onClick={e => this.handleDeleteClick(e, post)}
                      src={require("../../assets/cross.png")}
                      width="20px"
                    />
                  )}
                </div>
              </div>
              <p className="caption">{post.caption}</p>
              <div className="btnOnImg">
                <CardImg
                  className="card-img"
                  top
                  width="100%"
                  src={post.song.album.images[0].url}
                  alt="Card image cap"
                />
                <div className="audio">
                  <Music url={post.song} />
                </div>
              </div>

              <CardBody>
                <div className="flex-songInfo">
                  <CardTitle> {post.song.name}</CardTitle>
                  <CardSubtitle>{post.song.artists[0].name} </CardSubtitle>
                </div>
                <div className="social">
                  <img
                    onClick={el =>
                      this.handleLikeClick(
                        el,
                        this.props.user.username,
                        post._id,
                        post.creatorId
                      )
                    }
                    src={
                      isLiking
                        ? require("../../assets/like (2).png")
                        : require("../../assets/like (3).png")
                    }
                    width="50px"
                  />
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                    >
                      <h3>{post.likedByUser.length}</h3>
                    </DropdownToggle>
                    <DropdownMenu>
                      <div>{likes}</div>
                    </DropdownMenu>
                  </Dropdown>
                  <div className="spotify-link">
                    <a href={post.song.external_urls.spotify}>
                      <img src={require("../../assets/spotify.png")} />
                    </a>
                  </div>
                </div>
                <p className="date">{post.created_at}</p>
                <Comments post={post} loggedInUser={this.props.loggedInUser} />
              </CardBody>
            </Card>
          </CardDeck>
        </div>
      );
    });
    return <div className="flex-feed">{feedPosts}</div>;
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleLikeClick(el, likedUser, postId,creatorId) {
    api
      .post("/api/music/post/like", {
        likedUser,
        postId
      })
      .then(result => {
        this.props.updatePost(result);
        return api.post('/api/profile/user/like/notify', {
          othersName:likedUser,
          postId,
          userId:creatorId,
          kind:'like'
        })
          .then(result => {
            console.log("notification", result);
          })
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
