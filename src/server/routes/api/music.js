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

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

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

router.post("/post", (req, res, next) => {
  let { caption, songId } = req.body;
  // console.log("WORKING", caption, songId);
  // console.log(req.user);

  let post = new Post({
    caption: caption,
    songId: songId,
    creatorId: req.user._id,
    username: req.user.username,
    profilePicture: req.user.profilePicture
  });
  post.save().then(result => {
    console.log(result);
  });
});

module.exports = router;
