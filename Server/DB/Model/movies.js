import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
    default: "Movies",
  },
  director: {
    type: String,
    default: "NA",
  },
  downloadingLink: {
    type: Array,
    required: true,
  },
  duration: {
    type: String,
    default: "2h 59m",
  },
  genre: {
    type: Array,
    required: true,
  },
  language: {
    type: String,
    default: "Hindi",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  posterImg: {
    type: String,
    required: true,
  },

  quality: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  uploadedDate: {
    type: Date,
  },
  releasedDate: {
    type: String,
    default: new Date().getFullYear(),
  },
  screenshot: {
    type: String,
  },
  size: {
    type: Array,
    required: true,
  },
  starCast: {
    type: String,
    required: true,
  },
  storyLine: {
    type: String,
    default: "NA",
  },
  subCategory: {
    type: String,
    default: "Bollywood",
  },
  subtitle: {
    type: String,
    default: "No",
  },
  comments: {
    type: [
      {
        comment: { type: String, required: true },
        name: { type: String, required: true },
        email: String,
        phone: Number,
        commentTime: {
          type: Date,
        },
      },
    ],
  },
});

const Movies = mongoose.model("Movies", movieSchema);
export default Movies;
