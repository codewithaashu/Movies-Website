import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  genre: {
    type: Array,
  },
  webSeries: {
    type: Array,
  },
  filters: {
    type: Array,
  },
  movies: {
    type: Array,
  },
  trendingCriteria: {
    type: Number,
    default: 7.2,
  },
  latestCriteria: {
    type: Number,
    default: 12,
  },
});

const Data = mongoose.model("Data", dataSchema);
export default Data;
