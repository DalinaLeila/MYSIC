import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      list:[],
      comment: "",
    };

  }
  render() {
    console.log(this.props.post)
    return (
      <div>
      <input
            type="text"
            name="comment"
            placeholder="Comment"
            onChange={evt => this.handleComment("comment", evt.target.value)}
          />
          <Button
          color="primary"
          onClick={() =>
            this.props.handleTwoSubmit(this.state.comment,this.props.post._id)
          }
          className="submit-form-btn"
          type="submit"
        >
          Comment
        </Button>
        <p>{this.props.error}</p>
      </div>
    );
  }
  handleComment(key, newValue) {
    this.setState({
      [key]: newValue
    });
    console.log("handle comment", this.state.comment);
  }
}

export default Comments;