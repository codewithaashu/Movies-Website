import jwt from "jsonwebtoken";
import { User } from "../DB/Model/user.js";
export const isAuthenicate = async (req, res, next) => {
  try {
    const { authToken } = req.body;
    const { _id } = jwt.verify(authToken, "mynameisashishranjan");
    const user = await User.findOne({ _id });
    req.user = user;
    next();
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
