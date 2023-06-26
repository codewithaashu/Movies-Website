import Message from "../DB/Model/message.js";
import Movies from "../DB/Model/movies.js";

export const getData = async (req, res) => {
  try {
    const totalMovies = (await Movies.find({})).length;
    const totalMessage = (await Message.find({})).length;
    const movies = await Movies.find({});
    let totalComments = 0;
    for (let i = 0; i < totalMovies; i++) {
      totalComments += movies[i].comments.length;
    }
    res.status(200).json({ totalMovies, totalMessage, totalComments });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
