import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
class Music extends Component {
  constructor(props) {
    super(props);

    // console.log("songurl", this.props.url.preview_url)

    this.state = { play: true };
    this.audio = new Audio(this.props.url.preview_url);
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
        {this.props.url.preview_url != null && (
          <img
            onClick={this.togglePlay}
            src={
              this.state.play
                ? require("../../assets/play-button.png")
                : require("../../assets/round-pause-button.png")
            }
          />
        )}
        <a href={this.props.url.external_urls.spotify}>
          <img src={require("../../assets/spotify.png")} />
        </a>
      </div>
    );
  }
}

export default Music;
