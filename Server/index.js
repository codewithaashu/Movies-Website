import express from "express";
import connectDB from "./config/database.js";
import moviesRouter from "./routes/movies.js";
import cors from "cors";
import messageRouter from "./routes/message.js";
import commentRouter from "./routes/comment.js";
import dataRouter from "./routes/data.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 9000;
app.get("/", (req, res) => {
  res.send("Server is created by Ashish Ranjan");
});
connectDB();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/message", messageRouter);
app.use("/comment", commentRouter);
app.use("/data", dataRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
