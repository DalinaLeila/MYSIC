import React, { Component } from "react";
import Feed from "./Post/Feed";

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ""
    };
  }
  render() {
    return <div>{this.props.user && <Feed url={this.state.url} />}</div>;
  }
}

export default Discover;
