const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

router.get("/user-profile", (req, res, next) => {
  let user = req.user;
  console.log("PROFILE", user);
  let username = req.user.username;
  Post.find({ username })
    .sort([["updated_at", -1]])
    .then(posts => {
      let customPosts = {
        user,
        posts
      };
      res.send({ ...customPosts });
    })
    .catch(console.error);
});

router.get("/user-profile:username");
module.exports = router;
