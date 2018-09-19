import React, { Component } from 'react';
import api from "../utils/api"
import Music from './Music'

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }

  }

  componentDidMount() {
    api.get('/api/music/feed')
      .then(data => {
        this.setState({
          list: data
        })
        console.log(this.state.list)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.list)
    let feedPosts = this.state.list.map((post, index) => {
      return (
        <div key={index}>
          <div className="userpost">
            <div className="user">
              <img src={post.profilePicture} width="30px" className="profilepicture" />
              {post.username}- 
            </div>
            <div className="usercomment">
             " {post.caption} "
            </div>
          </div>
          <div className="songinfo">
            <img src={post.song.album.images[0].url} width="50px" />
            {post.song.artists[0].name} - {post.song.name} 
            <div className="audio">
              <Music url={post.song} />
            </div>
            {post.created_at.toString}
          </div>
          <hr />
        </div>
      );
    })
    return (
      <div>
        {feedPosts}
      </div>
    )
  }
}


export default Feed;