import React, { Component } from "react";
import api from "../utils/api";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      list: [],
      caption: "",
      song: {},
      dropdownOpen: false,
      placeholdertext: "What's your jam?"
    };
    this.toggle = this.toggle.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    let output = this.state.list.map(output => {
      return (
        <DropdownItem key={output.id}>
          <div onClick={this.toggle} onClick={e => this.handleClick(e, output)}>
            <img src={output.album.images[0].url} width="30px" />
            {output.name} by {output.artists[0].name}
          </div>
          <hr />
        </DropdownItem>
      );
    });
    return (
      <div className="input-container">
        <fieldset>
          <input
            className="input-box"
            type="text"
            name="caption"
            placeholder="Whats on your mind?"
            onChange={evt => this.handleCaption("caption", evt.target.value)}
          />
        </fieldset>
        <fieldset>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle className="dropsearch">
              <input
                type="text"
                value={this.state.search}
                onChange={evt => this.handleInputChange(evt.target.value)}
                className="input-box"
                placeholder={this.state.placeholdertext}
              />
            </DropdownToggle>

            <DropdownMenu
              modifiers={{
                setMaxHeight: {
                  enabled: true,
                  order: 890,
                  fn: data => {
                    return {
                      ...data,
                      styles: {
                        ...data.styles,
                        overflow: "auto",
                        maxHeight: 300
                      }
                    };
                  }
                }
              }}
            >
              {output}
            </DropdownMenu>
          </Dropdown>
        </fieldset>
        <Button
          outline
          color="success "
          onClick={() =>
            this.props.handleSubmit(this.state.caption, this.state.song)
          }
          className="submit-form-btn"
          type="submit"
        >
          Post
        </Button>
        <p>{this.props.error}</p>
      </div>
    );
  }

  handleClick(e, output) {
    console.log(output);
    this.setState({
      caption: this.state.caption,
      song: output,
      search: output.name
    });
    // console.log("handleClick, Caption", this.state.caption);
    // console.log("handleClick, song", this.state.song);
  }

  handleCaption(key, newValue) {
    this.setState({
      caption: newValue
    });
    console.log("handle caption", this.state.caption);
  }

  handleInputChange(newValue) {
    this.setState({
      search: newValue,
      dropdownOpen: newValue !== ""
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
}

export default Post;
