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
      error: ""
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
      <div>
        <fieldset>
          {/* <label>Caption</label> */}
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
            onChange={evt => this.handleInputChange(evt.target.value)}
            className="input"
            placeholder="What's your jam?"
          />
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>


            <DropdownToggle caret>
              Results
        </DropdownToggle>
            <DropdownMenu modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: 'auto',
                      maxHeight: 300,
                    },
                  };
                },
              },
            }}>

              {output}
            </DropdownMenu>
          </Dropdown>
        </fieldset>
        <Button
          color="primary"
          onClick={() => this.props.handleSubmit(this.state.caption, this.state.song)}
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
      song: output
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

  // handleSubmit() {
  //   api
  //     .post(`/api/music/post`, {
  //       caption: this.state.caption,
  //       song: this.state.song
  //     })
  //     .then(data => {
  //       // console.log("working");


  //       console.log(data)


  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

}

export default Post;
