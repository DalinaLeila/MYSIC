const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  othersName: {
    type: String,
    required: true,
  },
  profilePicture:{
    type:String,
    required:true,
  },
  postId: {
    type: String,
  },
  read: {
    type:Boolean,
  default: false},
  kind: {
    type:String,
    enum: ["comment",'like','follow']
  }},
  {  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }})
    
  module.exports = mongoose.model("Note", noteSchema);