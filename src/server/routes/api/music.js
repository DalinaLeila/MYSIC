const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

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
    caption: caption,
    song: song,
    creatorId: req.user._id,
    username: req.user.username,
    profilePicture: req.user.profilePicture
  });
  (!song || !caption)
   ? res.status(400).send({ error: "Missing Jamz" }):
  post.save().then(result => {
    console.log(result);
    res.send(post);
  });
});

router.post("/post/delete", (req, res, next) => {
  console.log("WORKING");
  let { el } = req.body;
  console.log(el._id);
  Post.findByIdAndDelete(el._id).then(data => {
    console.log("DELETED");
  });
});
module.exports = router;
