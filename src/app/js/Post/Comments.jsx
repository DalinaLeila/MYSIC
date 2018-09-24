import React, { Component } from "react";
import api from "../utils/api";

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
    let userComments = this.state.postComments.map((comment, index) => {
      return (
        <div key={comment._id}>
          <img src={comment.profilePicture} alt="" width="20px" />
          <h6>
            {comment.username}: {comment.comment}
          </h6>
          {comment.updated_at}
          <img
            onClick={e => this.handleDeleteComment(e, comment._id)}
            src={require("../../assets/cross.png")}
            width="20px"
          />
        </div>
      );
    });
    return (
      <div>
        <ul>{userComments}</ul>
        <input
          type="text"
          name="comment"
          placeholder="Comment"
          onChange={evt => this.handleComment("comment", evt.target.value)}
        />
        <Button
          color="primary"
          onClick={() =>
            this.handleSubmit(this.state.comment, this.props.post._id)
          }
          className="submit-form-btn"
          type="submit"
        >
          Comment
        </Button>
        {/* <p>{this.props.error}</p> */}
      </div>
    );
  }

  handleComment(key, newValue) {
    this.setState({
      [key]: newValue
    });
  }

  handleSubmit(comment, postId) {
    api
      .post(`/api/music/feed/comment/create`, {
        comment,
        postId
      })
      .then(comment => {
        this.updateComment(comment);
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
