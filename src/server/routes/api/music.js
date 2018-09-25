const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User")
const SpotifyWebApi = require("spotify-web-api-node");

const clientId = "b699d2563893414397d5d57212d81944",
  clientSecret = "282569e9e28d4b28a587e98dedce78de";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token. (Spotify)
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

//search tracks by user input
router.get("/tracks", (req, res, next) => {
  spotifyApi
    .searchTracks(req.query.name)
    .then(data => {
      res.send(data.body.tracks.items);
    })
    .catch(err => {
      console.log(err);
    });
});

//Retrieving only followed user posts for home page
router.get("/feed/selected", (req, res, next) => {
  let username = req.user.username;
  Post.find({
    $or: [
      {
        username: { $in: req.user.following }
      },
      { username }
    ]
  })
    .sort([["updated_at", -1]])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

//Retrieving all posts for discover page
router.get("/feed", (req, res, next) => {
  Post.find({})
    .sort([["updated_at", -1]])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});
//Saving a new post
router.post("/post", (req, res, next) => {
  let { caption, song } = req.body;
  let post = new Post({
    caption,
    song,
    creatorId: req.user._id,
    username: req.user.username,
    profilePicture: req.user.profilePicture
  });

  if (!song || !caption || !Object.keys(song).length)
    return res.status(400).send({ error: "Missing Jamz" });

  post.save().then(result => {
    console.log(result);
    res.send(post);
  });
});

//Deleting a Post
router.post("/post/delete", (req, res, next) => {
  let { el } = req.body;

  Post.findByIdAndDelete(el._id).then(data => {
    res.send({ _id: el._id });
  });
});

//COMMENTS
//Writing a comment
router.post("/feed/comment/create", (req, res, next) => {
  let { comment, postId, creatorId} = req.body;
  let message = new Comment({
    comment,
    postId: postId,
    username: req.user.username,
    profilePicture: req.user.profilePicture
  });
  message.save().then(result => {
    console.log("COMMENT", result);
    res.send(result);
    return User.findByIdAndUpdate(
      creatorId,
      {$push: {notifications:[{username:likedUser, postId}]}},
      { new: true }
      )
      .then(note=>{
    res.send(note)
      })
  });
});

//Displaying comments on a post

router.get("/feed/:postId/comment/display", (req, res, next) => {
  postId = req.params.postId;
  Comment.find({ postId })
    .sort([["created_at", 1]])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// Deleting comments
router.post("/feed/post/comment/delete", (req, res, next) => {
  console.log("WORKING");
  let { el } = req.body;
  console.log("test", el);
  Comment.findByIdAndDelete(el).then(data => {
    res.send({ _id: el });
  });
});

//Like
router.post("/post/like", (req, res, next) => {
  let { likedUser, postId, creatorId } = req.body;

  Post.findById(postId).then(post => {
    if (post.likedByUser.indexOf(likedUser) === -1) {
      Post.findByIdAndUpdate(
        postId,
        { $push: { likedByUser: likedUser } },
        { new: true }
      )
        .then(post => {
          res.send(post);
        })
        return User.findByIdAndUpdate(
        creatorId,
        {$push: {notifications:[{username:likedUser, postId}]}},
        { new: true }
        )
        .then(note=>{
      res.send(note)
        })
        .catch(console.error);
    } else {
      Post.findByIdAndUpdate(
        postId,
        { $pull: { likedByUser: likedUser } },
        { new: true }
      )
        .then(post => {
          res.send(post);
        })
        .catch(console.error);
    }
  });
});

module.exports = router;
