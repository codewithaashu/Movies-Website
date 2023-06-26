import express from "express";
import connectDB from "./config/database.js";
import moviesRouter from "./routes/movies.js";
import cors from "cors";
import messageRouter from "./routes/message.js";
import commentRouter from "./routes/comment.js";
import dataRouter from "./routes/data.js";
const app = express();
const PORT = 9000;
app.get("/", (req, res) => {
  res.send("Server is created by Ashish Ranjan");
});
connectDB();
app.use(express.json());
app.use(cors());
app.use("/movies", moviesRouter);
app.use("/message", messageRouter);
app.use("/comment", commentRouter);
app.use("/data", dataRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
