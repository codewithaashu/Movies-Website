import { User } from "../DB/Model/user.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobileNumber, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "User already exist.",
      });
    }
    user = await User.create({ name, email, mobileNumber, password });
    console.log(user);
    const token = user.generateToken();
    res.status(200).cookie("token", token).json({
      user: { name, email, mobileNumber },
      message: "User successfully registered.",
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "User doesn't exist.",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(200).json({
        message: "Invalid crediantial details.",
      });
    }
    const token = user.generateToken();
    res.status(200).json({
      user: { email, password, token, verified: user.verified },
      message: "Login successfully",
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    res.status(200).json({ user, message: "User deleted successfully." });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
