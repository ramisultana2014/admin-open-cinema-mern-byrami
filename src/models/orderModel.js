const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  movieTitle: String,
  movieID: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  seats: [String],
  dayShowTime: String,
  price: Number,
  totaldayshowTimePrice: Number,
  numberOfSeats: Number,
});
const orderSchema = new mongoose.Schema(
  {
    email: String,
    address: String,
    phoneNumber: String,
    totalOrderPrice: Number,
    ticketvervicationCode: String,
    cart: [cartSchema],
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
    // eslint-disable-next-line prettier/prettier
  }
);
orderSchema.index({ email: 1 });
// orderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "userId",
//     select: "name",
//   });

//   next();
// });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
