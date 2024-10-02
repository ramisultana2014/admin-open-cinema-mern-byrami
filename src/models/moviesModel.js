const mongoose = require("mongoose");

const showDaysSchema = new mongoose.Schema({
  day: String,
  showTimes: String,
  dayShowTime: String,
  availableSeats: [String],
});
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  initialRelease: Date,
  trailer: String,
  duration: String,
  category: String,
  image1: { url: String, pic: String },
  image2: { url: String, pic: String },
  price: Number,
  showDays: [showDaysSchema],
});
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
