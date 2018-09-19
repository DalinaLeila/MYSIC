const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

router.get("/user-profile", (req, res, next) => {
  let user = req.user;
  let username = req.user.username;
  Post.find({ username })
    .sort([["updated_at", -1]])
    .then(posts => {
      res.send({
        user,
        posts
      });
    })
    .catch(console.error);
});

router.get("/user-profile/:username", (req, res, next) => {
  let username = req.params.username;
  console.log("PROFILE", username);

  let user;
  User.findOne({ username })
    .then(u => {
      user = u;
      return Post.find({ username }).sort([["updated_at", -1]]);
    })
    .then(posts => {
      res.send({
        posts,
        user
      });
    })
    .catch(console.error);
});

module.exports = router;
