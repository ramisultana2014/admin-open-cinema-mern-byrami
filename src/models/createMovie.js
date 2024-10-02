const mongoose = require("mongoose");

const showDaysSchema = new mongoose.Schema({
  day: String,
  showTimes: String,
  dayShowTime: String,
  availableSeats: [String],
});

const createMovieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    initialRelease: Date,
    trailer: String,
    duration: String,
    category: String,
    price: Number,
    uploaded: String,
    showDays: [showDaysSchema],
    movieImage1: { type: Buffer },
    movieImage2: { type: Buffer },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
    // eslint-disable-next-line prettier/prettier
  }
);
const CreateMovie = mongoose.model("CreateMovie", createMovieSchema);
module.exports = CreateMovie;
