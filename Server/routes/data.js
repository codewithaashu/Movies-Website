import express from "express";
import { getData } from "../controller/data.js";
const dataRouter = express.Router();
dataRouter.route("/").get(getData);
export default dataRouter;
