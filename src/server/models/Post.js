const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const postSchema = new Schema(
  {
    caption: String,
    songId: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    username: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Post", postSchema);
