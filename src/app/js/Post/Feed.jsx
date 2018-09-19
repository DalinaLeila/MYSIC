import React, { Component } from 'react';
import api from "../utils/api"

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
    let feedPosts = this.state.list.map((post,index) => {
      return (
        <div key={index}>
          <div className="userpost">
            <div className="user">
              <img src={post.profilePicture} width="30px" />
              {post.username}
            </div>
            <div className="usercomment">
              {post.caption}
            </div>
          </div>
          <div className="songinfo">
            <img src={post.song.album.images[0].url} width="50px" />
            {post.song.name} by {post.song.artists[0].name}
           <div className="audio">
           <audio preload="none">
                <source src={post.preview_url} type="audio/mpeg" />
               </audio>
               </div>
          </div>
        <hr />
        </div>
    );
  })
return(
  <div>
    {feedPosts}
  </div>
)
}
}


export default Feed;