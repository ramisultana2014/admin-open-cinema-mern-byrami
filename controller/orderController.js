const Order = require("../src/models/orderModel");

const Movie = require("../src/models/moviesModel");

const helperFunction = require("../src/helpers");
const sendWelcomeEmail = require("../src/emails/email");

exports.createOrder = async (req, res) => {
  const ticketvervicationCode = helperFunction.codegenerator();
  try {
    await Promise.all(
      req.body.cart.map(async (item) => {
        const movie = await Movie.findById(item.movieID);

        const dayshowtimeObj = movie.showDays.find(
          // eslint-disable-next-line prettier/prettier
          (m) => m.dayShowTime === item.dayShowTime
        );
        dayshowtimeObj.availableSeats = dayshowtimeObj.availableSeats.filter(
          // eslint-disable-next-line prettier/prettier
          (el) => !item.seats.includes(el)
        );
        movie.showDays = movie.showDays.filter(
          // eslint-disable-next-line prettier/prettier
          (d) => d.dayShowTime !== item.dayShowTime
        );
        movie.showDays = [...movie.showDays, dayshowtimeObj];
        await movie.save();
        // eslint-disable-next-line prettier/prettier
      })
    );
    sendWelcomeEmail(
      req.body.email,
      ticketvervicationCode,
      req.body.phoneNumber,
      req.body.cart
    );
    const newOrder = await Order.create({ ...req.body, ticketvervicationCode });
    res.status(201).json({
      status: "success",
      order: newOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getOrder = async (req, res) => {
  const { ticketvervicationCode } = req.params;

  try {
    const order = await Order.findOne({
      ticketvervicationCode: ticketvervicationCode,
    });
    if (!order) {
      return res.status(404).json({
        error: "no order was found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
