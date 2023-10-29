import mongoose from "mongoose";

const CommnetSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommnetSchema)
export default Comment