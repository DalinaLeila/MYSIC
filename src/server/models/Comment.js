const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    comment: String,
    username: String,
    profilePicture: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Comment", commentSchema);
