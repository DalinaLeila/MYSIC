import React, { Component } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
const moment = require("moment");

import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      comment: "",
      postComments: []
    };

    this.updateComment = this.updateComment.bind(this);

    this.deleteComment = this.deleteComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    api
      .get(`/api/music/feed/${this.props.post._id}/comment/display`)
      .then(data => {
        this.setState({
          postComments: data
        });
      });
  }

  render() {
    // console.log(this.props.post._id);
    let userComments = this.state.postComments.map(comment => {
      return (
        <div className="force-overflow" key={comment._id}>
          <div className="flex-comment">
            <Link to={`/profile/${comment.username}`}>
              <div className="user user-comment">
                <img
                  className="profilePicture ppComment"
                  src={comment.profilePicture}
                  alt=""
                  width="30px"
                />
                <div>
                  <h6>{comment.username}</h6>
                  <p className="date date-size">
                    {moment(comment.updated_at).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
            <p>{comment.comment}</p>
            <div>
              {comment.username === this.props.loggedInUser.username && (
                <img
                  onClick={e => this.handleDeleteComment(e, comment._id)}
                  src={require("../../assets/cross.png")}
                  className="delete-img"
                />
              )}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <input
          className="input input-post"
          type="text"
          name="comment"
          placeholder="Write a comment..."
          onChange={evt => this.handleComment("comment", evt.target.value)}
onKeyDown={evt =>
            this.checkKey(evt, this.state.comment, this.props.post._id,this.props.post.creatorId,)

          }
        />
        <div className="scrollbar" id="style-1">
          {userComments}
        </div>
      </div>
    );
  }

  checkKey(event, comment, postId,userId,) {
    if (event.keyCode == 13) {
      this.handleSubmit(comment, postId,userId,);
    }
  }

  handleComment(key, newValue) {
    this.setState({
      [key]: newValue
    });
  }

  handleSubmit(comment, postId, userId,) {
    api
      .post(`/api/music/feed/comment/create`, {
        comment,
        postId
      })
      .then(comment => {
        this.updateComment(comment);
        return api.post('/api/profile/user/comment/notify', {
          userId,
          postId,
          
        })
          .then(result => {
            console.log("notification", result);
          })
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateComment(comment) {
    this.setState({
      postComments: this.state.postComments.concat(comment)
    });
  }

  handleDeleteComment(e, el) {
    console.log("huiii", el);
    api
      .post(`/api/music/feed/post/comment/delete`, {
        el
      })
      .then(result => {
        this.deleteComment(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteComment(comment) {
    this.setState({
      postComments: this.state.postComments.filter(el => {
        if (el._id !== comment._id) return true;
        return false;
      })
    });
  }
}

export default Comments;
