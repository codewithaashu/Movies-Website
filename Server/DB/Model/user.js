import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: {
      values: ["Admin", "Super-Admin"],
      message: "{VALUE} is not supported",
    },
    default: "Admin",
  },
  tokens: {
    type: [{ token: String }],
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, "mynameisashishranjan");
  this.tokens = [...this.tokens, { token }];
  this.save();
  return token;
};
export const User = mongoose.model("User", userSchema);
