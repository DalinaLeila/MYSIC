const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  commenterName: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  read: {
    type:Boolean,
  default: false},
  kind: {
    type:String,
    enum: ["comment",'like']
  }},
  {  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }})

  module.exports = mongoose.model("Note", noteSchema);