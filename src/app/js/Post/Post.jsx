import React, { Component } from "react";
import api from "../utils/api";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      list: [],
      caption: "",
      song: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let output = this.state.list.map(output => {
      return (
        <div key={output.id}>
          <div onClick={e => this.handleClick(e, output)}>
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
            onChange={evt => this.handleCaption("caption", evt.target.value)}
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
    console.log(output);
    this.setState({
      caption: this.state.caption,
      song: output
    });
    // console.log("handleClick, Caption", this.state.caption);
    // console.log("handleClick, song", this.state.song);
  }

  handleCaption(key, newValue) {
    this.setState({
      [key]: newValue
    });
    console.log("handle caption", this.state.caption);
  }

  handleInputChange(key, newValue) {
    this.setState({
      [key]: newValue
    });
    api
      .get(`/api/music/tracks?name=${newValue}`)
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
        caption: this.state.caption,
        song: this.state.song
      })
      .then(data => {
        this.history.push("/profile");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Post;
