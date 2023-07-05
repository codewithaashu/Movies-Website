import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUserDetails,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/user.js";
import { isAuthenicate } from "../middleware/authenticate.js";
const userRouter = express.Router();
userRouter.route("/").post(registerUser).get(getAllUsers);
userRouter.route("/:id").put(updateUser).get(getUserDetails).delete(deleteUser);
userRouter.route("/verify").post(isAuthenicate, getUser);
// userRouter.route("/users").get(getAllUsers);
userRouter.route("/login").post(loginUser);
export default userRouter;
