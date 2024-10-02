const fs = require("fs");

const mongoose = require("mongoose");

const Movie = require("../src/models/moviesModel");

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));
const movies = JSON.parse(
  fs.readFileSync(`${__dirname}/moviesData.json`, "utf-8")
);
const formattedMovies = movies.map((movie) => {
  const [year, month, day] = movie.initialRelease.split("/").map(Number);
  return {
    ...movie,
    initialRelease: new Date(year, month - 1, day), // Month is 0-indexed
  };
});
const importData = async () => {
  try {
    await Movie.create(formattedMovies);

    console.log("Data successfuly loaded 🤝");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Movie.deleteMany();

    console.log("Data successfuly deleted 🤝");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// in comand line if we write npx env-cmd ./config/dev.env node dev-data/import-dev-data.js --import
//  npx env-cmd ./config/dev.env node dev-data/import-dev-data.js --delete
// then the console.log(process.argv);gave this array
// ['/usr/local/bin/node',
//   '/Users/andrewdeeb/Desktop/NODE_V2/4-natours/natours-v2/dev-data/data/import-dev-data.js','--import'] so we use it to write this code

// Yes, exactly! When you run npx env-cmd, npx will first look for the env-cmd executable locally in your project's node_modules directory. If it finds it there, it will execute it. If env-cmd is not found locally, npx will automatically install it temporarily (without saving it to package.json) and then execute it.

// This behavior of npx makes it very convenient for running packages without the need to manage their installation manually. You can simply specify the package you want to run, and npx takes care of the rest, ensuring that the required package is available and executed correctly.

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}