import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
  username: {
    type: String,
  },
  userid: {
    type: String,
  },
  categorys: {
    type: Array,
  },
});
const Post = mongoose.model("Post", PostSchema)
export default Post