const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  profilePicture: {
    type: String,
    default:
      "http://groovesharks.org/assets/images/default_avatar.jpg"
  },
  following: [{ type: Schema.Types.String, ref: "User" }],
 
});

module.exports = mongoose.model("User", userSchema);
