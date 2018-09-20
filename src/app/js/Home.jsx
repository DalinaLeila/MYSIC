import React, { Component } from "react";
import Post from "./Post/Post";
import Feed from "./Post/Feed";
import api from "./utils/api";

class Home extends Component {
  constructor(props) {

    super(props)

    this.state = {
      error: "",
      list: [],
      loading: true,

    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    api
      .get(`/api/music/feed/selected`)
      .then(data => {
        this.setState({
          list: data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.props.user)
      if (this.state.loading) {
        return (
          <div>loading ...</div>
        )
      }
    return (
      <div>
        <div className="container">
          <h1>
            Hello,{" "}
            {this.props.user
              ? this.props.user.username
              : "Welcome to Musicly, log in and share your music!"}
            !
          </h1>
        </div>

        {this.props.user && <Post handleSubmit={this.handleSubmit} />}
        {this.props.user && <Feed list={this.state.list} />}
      </div>
    );
  }

  handleSubmit(caption, song) {
    api
      .post(`/api/music/post`, {
        caption,
        song
      })
      .then(data => {
        this.setState({
          list: [data].concat(this.state.list)
        })

      })
      .catch(err => {
        console.log(err);
      });
  }


}

export default Home;
