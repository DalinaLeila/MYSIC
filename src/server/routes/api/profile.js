const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

const { createUserToken } = require("../../utils/token");

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

router.post("/user-profile/:username/follow", (req, res, next) => {
  let username = req.params.username;
  let myId = req.user._id;

  User.findOne({ username }).then(user => {
    User.findOne({ _id: myId }, (err, myUser) => {
      if (err) console.log(err);

      // if it does NOT find user = -1
      if (myUser.following.indexOf(user.username) === -1) {
        console.log("FOLLOWING");
        User.findByIdAndUpdate(
          { _id: myId },
          { $push: { following: user.username } },
          { new: true }
        )
          .then(user => {
            const userToken = createUserToken(user);
            res.send({ token: userToken });
          })
          .catch(console.error);
      } else {
        console.log("UNFOLLOWED");
        User.findByIdAndUpdate(
          { _id: myId },
          { $pull: { following: user.username } },
          { new: true }
        )
          .then(user => {
            const userToken = createUserToken(user);
            res.send({ token: userToken });
          })
          .catch(console.error);
      }
    });
  });
});

module.exports = router;
