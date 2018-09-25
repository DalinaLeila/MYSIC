import React, { Component } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

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
    console.log(this.props.post._id);
    let userComments = this.state.postComments.map(comment => {
      return (
        <div className="force-overflow" key={comment._id}>
          <Link to={`/profile/${comment.username}`}>
            <div className="flex-comment">
              <div>
                <img
                  className="profilePicture"
                  src={comment.profilePicture}
                  alt=""
                  width="30px"
                />
              </div>
              <div>
                <h6>{comment.username}</h6>
              </div>
            </div>
          </Link>

          <h6>{comment.comment}</h6>
          <div className="flex-comment">
            <p className="date">{comment.updated_at}</p>
            {comment.username === this.props.loggedInUser.username && (
              <img
                onClick={e => this.handleDeleteComment(e, comment._id)}
                src={require("../../assets/cross.png")}
                className="delete-img"
              />
            )}
          </div>
        </div>
      );
    });
    return (
      <div>
        <input
          className="input-comment"
          type="text"
          name="comment"
          placeholder="Write a comment..."
          onChange={evt => this.handleComment("comment", evt.target.value)}
        />
        <button
          className="btn-comment"
          color="primary"
          onClick={() =>
            this.handleSubmit(this.state.comment, this.props.post._id)
          }
          className="submit-form-btn"
          type="submit"
        >
          Comment
        </button>
        <div className="scrollbar" id="style-1">
          {userComments}
        </div>
      </div>
    );
  }

  handleComment(key, newValue) {
    this.setState({
      [key]: newValue
    });
  }

  handleSubmit(comment, postId,creatorId) {
    api
      .post(`/api/music/feed/comment/create`, {
        comment,
        postId,
        creatorId
      })
      .then(comment => {
        this.updateComment(comment);
      })
      return api.post('/api/profile/user-profile/comment/notify',{

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
