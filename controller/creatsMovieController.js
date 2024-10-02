// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require("sharp");

const CreateMovie = require("../src/models/createMovie");

exports.createMovie = async (req, res) => {
  try {
    const buffer1 = Buffer.from(req.body.movieImage1);
    const buffer2 = Buffer.from(req.body.movieImage2);
    const processedImage1 = await sharp(buffer1)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const processedImage2 = await sharp(buffer2)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    const newMovie = await CreateMovie.create({
      ...req.body,
      movieImage1: processedImage1,
      movieImage2: processedImage2,
    });
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getAllCreatedMovies = async (req, res) => {
  try {
    const newRealeses = await CreateMovie.find();
    if (!newRealeses || newRealeses.length === 0) {
      return res.status(404).json({
        status: "no new movies found",
      });
    }
    res.status(200).json({
      status: "success",
      results: newRealeses.length,
      data: {
        newRealeses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
