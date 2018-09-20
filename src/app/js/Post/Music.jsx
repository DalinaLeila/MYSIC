import React, { Component } from "react";
import { Button } from "reactstrap";

class Music extends Component {
  constructor(props) {
    super(props);

    console.log("songurl", this.props.url.preview_url)

    this.state = { play: true };
    this.audio = new Audio(this.props.url.preview_url);
    this.props.url.preview_url = "";
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    this.setState({ play: !this.state.play });
    console.log(this.audio);
    this.state.play ? this.audio.play() : this.audio.pause();
  }

  render() {
    return (
      <div>
        <Button onClick={this.togglePlay}>
          {this.state.play ? "Play" : "Pause"}
        </Button>
      </div>
    );
  }
}

export default Music;
