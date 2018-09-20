const jwt = require("jsonwebtoken");
const config = require("../config");

function createUserToken(user) {
  const userObject =
    typeof user.toObject === "function" ? user.toObject() : user;

  delete userObject.password;

  const token = jwt.sign(userObject, config.SECRET_JWT_PASSPHRASE);

  return token;
}

module.exports = { createUserToken };
