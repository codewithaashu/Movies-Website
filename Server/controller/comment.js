import Movies from "../DB/Model/movies.js";

export const addComment = async (req, res) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(400).json({ message: "Comment cannot be added." });
    }
    movie.comments = [...movie.comments, { ...req.body }];
    await movie.save();
    res.status(200).json({ movie, message: "Comment added successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getComments = async (req, res) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(400).json({ message: "Movie doesn't exist." });
    }
    console.log(movie.comments);
    if (!movie.comments) {
      return res.status(200).json({ message: "No comment." });
    }
    return res.status(200).json({ comments: movie.comments });
  } catch (err) {
    res.status(500).json({ message: "Server Error." });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const movies = await Movies.find({});
    console.log(movies);
    const moviesWithComments = movies.filter((curr) => {
      return curr.comments.length !== 0;
    });
    const allComments = moviesWithComments?.map((curr) => {
      return {
        name: curr.name,
        category: curr.category,
        uploadedDate: curr.uploadedDate,
        comments: curr.comments,
      };
    });
    console.log(allComments);
    res.status(200).json({ comments: allComments });
  } catch (err) {
    console.log("Error :", err);
    res.status(500).json({ message: "Server Error." });
  }
};
