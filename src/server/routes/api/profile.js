const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const Notification = require("../../models/Notification");

const { createUserToken } = require("../../utils/token");

router.get("/user-profile", (req, res, next) => {
  let user = req.user;
  let username = req.user.username;
  Post.find({ username })
    .sort([["created_at", -1]])
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
      return Post.find({ username }).sort([["created_at", -1]]);
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

//Notifications!!!

//comment Notifications
router.post("/user/comment/notify", (req, res, next) => {
  let { userId, postId } = req.body;
  let note = new Notification({
    userId,
    postId,
    othersName: req.user.username,
    kind: "comment",
    profilePicture: req.user.profilePicture
  });
  note.save().then(result => {
    console.log("notification", result);
    res.send(result);
  });
});

//like notifications
router.post("/user/like/notify", (req, res, next) => {
  let { userId, postId } = req.body;
  Notification.findOne(
    { othersName: req.user.username, postId: postId },
    function(err, result) {
      if (err) {
        console.log("hi");
      }
      if (result) {
        Notification.findByIdAndRemove(result._id).then(result => {
          console.log("deleted");
        });
      } else {
        let note = new Notification({
          userId,
          postId,
          othersName: req.user.username,
          kind: "like",
          profilePicture: req.user.profilePicture
        });
        note.save().then(result => {
          console.log("notification", result);
          res.send(result);
        });
      }
    }
  );
});

//follow notifications
router.post("/user/follow/notify", (req, res, next) => {
  let { userId } = req.body;
  Notification.findOne(
    { othersName: req.user.username, userId: userId },
    function(err, result) {
      if (err) {
        console.log("hi");
      }
      if (result) {
        Notification.findByIdAndRemove(result._id).then(result => {
          console.log("deleted");
        });
      } else {
        let note = new Notification({
          userId,
          othersName: req.user.username,
          kind: "follow",
          profilePicture: req.user.profilePicture
        });
        note.save().then(result => {
          console.log("notification", result);
          res.send(result);
        });
      }
    }
  );
});

//Delete notifications
router.post("/user/delete/notify", (req, res, next) => {
  let { _id } = req.body;
  console.log("DELETE ID", _id);
  Notification.findByIdAndDelete(_id).then(result => {
    console.log("notification", result);
    res.send(result);
  });
});

//Show Notifications!
router.get("/user/notify", (req, res, next) => {
  console.log("USER", req.user._id);
  let userId = req.user._id;
  Notification.find({ userId })
    .sort([["created_at", -1]])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
