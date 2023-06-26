import Data from "../DB/Model/data.js";
import Message from "../DB/Model/message.js";
import Movies from "../DB/Model/movies.js";
import jsonData from "../data.json" assert { type: "json" };
export const addData = async (req, res) => {
  try {
    console.log(jsonData);
    const {
      genre,
      movies,
      webSeries,
      filters,
      trendingCriteria,
      latestCriteria,
    } = jsonData;
    const data = new Data({
      genre,
      movies,
      webSeries,
      filters,
      trendingCriteria,
      latestCriteria,
    });
    await data.save();
    res.status(200).json({ data, message: "Data successfully added." });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getData = async (req, res) => {
  try {
    const websiteData = await Data.find({});
    const totalMovies = (await Movies.find({})).length;
    const totalMessage = (await Message.find({})).length;
    const movies = await Movies.find({});
    let totalComments = 0;
    for (let i = 0; i < totalMovies; i++) {
      totalComments += movies[i].comments.length;
    }
    console.log(totalComments);
    res
      .status(200)
      .json({ websiteData, totalMovies, totalMessage, totalComments });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
