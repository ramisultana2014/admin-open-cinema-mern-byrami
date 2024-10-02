const CreateMovie = require("../src/models/createMovie");
const Movie = require("../src/models/moviesModel");

exports.getAllMovies = async (req, res) => {
  //{{url}}/api/movies?showDays.day=sun&sort=-showDays.showTimes
  //req.query is { 'showDays.day': 'sun', sort: 'showdays.showTimes' }
  try {
    const queryObj = { ...req.query };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = Movie.find(queryObj);
    if (req.query.sort) {
      const sortBy = req.query.sort;
      query = query.sort(sortBy);
    } else {
      query = query.sort("id");
    }
    const movies = await query;
    res.status(200).json({
      status: "success",
      results: movies.length,

      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
// exports.email = async (req, res) => {
//   const order = {
//     email: "rami@test.com",
//     address: "dubai",
//     phoneNumber: "949574984",
//     totalOrderPrice: 30,
//     ticketvervicationCode: "104912",
//     cart: [
//       {
//         movieTitle: "Trigger Warning",
//         movieID: "669fa5f22ef19f0e8e2c2813",
//         seats: ["10a", "11a", "12a"],
//         dayShowTime: "sat18",
//         price: 10,
//         totaldayshowTimePrice: 30,
//         numberOfSeats: 3,
//         _id: "66a0eea7b2ef587ccd5807e6",
//       },
//       {
//         movieTitle: "if",
//         movieID: "669fa5f22ef19f0e8e2c2818",
//         seats: ["10a", "11a", "12a"],
//         totaldayshowTimePrice: 15,
//         numberOfSeats: 3,
//         dayShowTime: "sat11",
//       },
//     ],
//   };
//   try {
//     res.status(200).render("email", {
//       order,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
exports.updateMovie = async (req, res) => {
  //console.log(req.body.uploaded);

  try {
    //the id here is the obj id
    let movie;
    if (req.body.uploaded) {
      movie = await CreateMovie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //will return the update doc
        runValidators: true,
      });
    }

    //console.log(product);

    if (!movie) {
      return res.status(404).json({
        status: "no movie with that id",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: req.params.id });
    if (!movie) {
      return res.status(404).json({
        status: "no movie with that id",
      });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
