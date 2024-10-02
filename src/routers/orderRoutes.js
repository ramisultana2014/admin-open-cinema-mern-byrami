const express = require("express");

const orderController = require("../../controller/orderController");

const authController = require("../../controller/authController");

const router = express.Router();

router.post("/createorder", orderController.createOrder);
router.use(authController.prtotectedRouter);
router.get("/getallorders", orderController.getAllOrders);
router.route("/:ticketvervicationCode").get(orderController.getOrder);
module.exports = router;
