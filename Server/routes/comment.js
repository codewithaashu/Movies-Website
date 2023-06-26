import express from "express";
import {
  addComment,
  getAllComments,
  getComments,
} from "../controller/comment.js";
const commentRouter = express.Router();
commentRouter.route("/").get(getAllComments);
commentRouter.route("/:id").post(addComment).get(getComments);
export default commentRouter;
