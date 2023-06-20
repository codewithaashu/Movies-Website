import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../controller/movies.js";
const moviesRouter = express.Router();

moviesRouter.route("/").get(getAllMovies).post(addMovie);
moviesRouter.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);
export default moviesRouter;
