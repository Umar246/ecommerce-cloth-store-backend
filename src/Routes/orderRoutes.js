const express = require("express");
const router = express.Router();

const OrderController = require("../Controllers/orderController");
const authenticate = require("../Middleware/authenticate");

router.post("/", authenticate, OrderController.createOrder);
router.get("/user", authenticate, OrderController.orderHistory);
router.get("/:id", authenticate, OrderController.findOrderById);

module.exports = router;
