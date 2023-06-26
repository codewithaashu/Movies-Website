import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is missing."],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  purpose: {
    type: String,
    enum: {
      values: ["Request Movies", "Removal Request", "Other"],
      message: "{VALUE} is not supported",
    },
    required: [true, "purpose field is missing."],
  },
  message: {
    type: String,
    required: [true, "message field is missing"],
    minLength: [10, "Message is too short !"],
  },
  messageDate: {
    type: Date,
    default: new Date(),
  },
});
const Message = mongoose.model("Message", messageSchema);
export default Message;
