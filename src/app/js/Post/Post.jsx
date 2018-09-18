import React, { Component } from "react";
import api from "../utils/api";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      list: [],
      post: [{ caption: "", songId: "" }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let output = this.state.list.map(output => {
      return (
        <div>
          <div key={output.id} onClick={e => this.handleClick(e, output)}>
            <img src={output.album.images[0].url} width="30px" />
            {output.name} by {output.artists[0].name}
            {/* // <audio preload="none">
              //   <source src={output.preview_url} type="audio/mpeg" />
              // </audio> */}
          </div>
          <hr />
        </div>
      );
    });
    return (
      <div>
        <fieldset>
          <label>Caption</label>
          <input
            type="text"
            name="caption"
            placeholder="Caption"
            onChange={evt => this.handleInputChange("post", evt.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            value={this.state.search}
            onChange={evt => this.handleInputChange("search", evt.target.value)}
            className="input"
            placeholder="What's your jam?"
          />
          <div>{output}</div>
        </fieldset>
        <button
          onClick={this.handleSubmit}
          className="submit-form-btn"
          type="submit"
        >
          Post
        </button>
      </div>
    );
  }

  handleClick(e, output) {
    this.setState({
      post: { caption: "hi", songId: output.id }
    });
    console.log(this.state.post);
  }

  handleInputChange(key, newValue) {
    this.setState({
      [key]: newValue
    });
    api
      .get(`http://localhost:3000/api/music/tracks?name=${newValue}`)
      .then(data => {
        this.setState({
          list: data
        });
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }

  handleSubmit() {
    api
      .post(`/api/music/post`, {
        post: {
          caption: this.state.post.caption,
          songId: this.state.post.songId
        }
      })
      .then(data => {
        this.props.history.push("/");
      })
      .catch(err => {
        console(err);
      });
  }
}

export default Post;
