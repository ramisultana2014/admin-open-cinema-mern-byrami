const path = require("path");

const express = require("express");

const rateLimit = require("express-rate-limit");

//TODO:helmet set security http headers
const helmet = require("helmet");

const cookieParser = require("cookie-parser");

const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");

const movieRouter = require("./src/routers/movieRoutes");

const orderRouter = require("./src/routers/orderRoutes");

const stripeRouter = require("./src/routers/stripeRoutes");

const adminRouter = require("./src/routers/adminRoutes");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //that how we read inside views folder so we can write email directlty in movieController
//TODO: middleware
app.use(express.static(path.join(__dirname, "public"))); //that how we read inside public folder so we can write
// '/img/favicon.png

app.use(cookieParser()); //cookieParser(parse data from cookie /req.cookies.jwt)/)
//req.cookies object is populated by the cookie-parser middleware, which typically runs after routing is completed.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:"], // Allow blob URLs
    },
  })
);
//TODO:limiter is middleware fun , allow 100 request per 1 hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP,please try again in an hour",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" })); //TODO: let us use read date from body into the req  Object (req.body) ( parse data from body)
//limit: '10kb' not accept body larger than 10 kb
//TODO:cookieParser(parse data from cookie /req.cookies.jwt)/)
//app.use(express.json()); //let us read req.body

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
//express.urlencoded let us read date sent from form in html page when we dont use api and dont use Js to read data from form
//TODO:Data sanitization against NoSQL query injection, mean attack with just knowing password and write "email":{"$gt":""},
app.use(mongoSanitize()); //it remove all the $
//TODO:Data sanitization against xxs(cross site)
app.use(xss()); //clean  attack with html (example in postman)
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use("/api/movies", movieRouter);
app.use("/api/orders", orderRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/admin", adminRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
  //res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});
module.exports = app;
