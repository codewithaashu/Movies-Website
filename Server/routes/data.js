import express from "express";
import { addData, getData } from "../controller/data.js";
const dataRouter = express.Router();
dataRouter.route("/").post(addData).get(getData);
export default dataRouter;
