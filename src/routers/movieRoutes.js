const express = require("express");

const movieController = require("../../controller/movieController");

const creatsMovieController = require("../../controller/creatsMovieController");

const authController = require("../../controller/authController");

const router = express.Router();
//router.use(authController.prtotectedRouter);
router.route("/").get(movieController.getAllMovies);
// router.route("/email").get(movieController.email);
router
  .route("/creatmovie")
  .post(authController.prtotectedRouter, creatsMovieController.createMovie)
  .get(
    authController.prtotectedRouter,
    creatsMovieController.getAllCreatedMovies
  );
router
  .route("/:id")
  .patch(authController.prtotectedRouter, movieController.updateMovie)
  .delete(authController.prtotectedRouter, movieController.deleteMovie);
module.exports = router;
