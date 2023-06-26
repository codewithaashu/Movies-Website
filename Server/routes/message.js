import express from "express";
import { addMessage, getMessage, getMessages } from "../controller/message.js";
const messageRouter = express.Router();
messageRouter.route("/").post(addMessage).get(getMessages);
messageRouter.route("/:id").get(getMessage);
export default messageRouter;
