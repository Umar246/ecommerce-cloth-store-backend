const express = require("express");
const router = express.Router();

const CartController = require("../Controllers/cartController");
const authenticate = require("../Middleware/authenticate");

router.get("/", authenticate, CartController.findUserCart);
router.put("/add", authenticate, CartController.addItemToCart);

module.exports = router;
