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
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg"
  },
  following: [{ type: Schema.Types.String, ref: "User" }],
  notifications: [{
    username: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    read: {
      type:Boolean,
    default: false}
  },
  //  {  timestamps: {
  //       createdAt: "created_at",
  //       updatedAt: "updated_at"
  //     }}
]
}
);

module.exports = mongoose.model("User", userSchema);
