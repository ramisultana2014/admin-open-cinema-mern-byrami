const express = require("express");

const stripeController = require("../../controller/stripeController");

const router = express.Router();

//this route to create session between client and server when using stripe
router.post("/create-payment-intent", stripeController.createPaymentIntent);

module.exports = router;
