import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "comment field is missing."],
  },
  name: {
    type: String,
    required: [true, "name field is missing."],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
