import Movies from "../DB/Model/movies.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find({});
    res.status(200).json({ movies: movies });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const addMovie = async (req, res) => {
  try {
    let movie = await Movies.findOne({ name: req.body.name });
    if (movie) {
      return res.status(400).json({ message: "Movies Already Exist" });
    }
    movie = await Movies.create({ ...req.body, uploadedDate: new Date() });
    res.status(200).json({ movie, message: "Movie Added Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(400).json({ message: "Movie does not exist" });
    }
    res.status(200).json({ movie });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(400).json({ message: "Movie does not exist" });
    }
    const movies = await Movies.findByIdAndUpdate(
      req.params.id,
      { ...movie._doc, ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ movies, message: "Movie Detail exist" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(400).json({ message: "Movie does not exist" });
    }
    await Movies.deleteOne({ _id: req.params.id });
    const movies = await Movies.find({});
    res.status(200).json({ movies, message: "Movie Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
