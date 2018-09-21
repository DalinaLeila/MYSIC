const jwt = require("jsonwebtoken");
const config = require("../config");

function createPostToken(post) {
  const postObject =
    typeof post.toObject === "function" ? post.toObject() : post;

  delete postObject.song;

  const token = jwt.sign(postObject, config.SECRET_JWT_PASSPHRASE);

  return token;
}

module.exports = { createPostToken };
