const express = require("express");
const router = express.Router();

const CartItemController = require("../Controllers/cartItemController");
const authenticate = require("../Middleware/authenticate");

router.put("/:id", authenticate, CartItemController.updateCartITem);
router.delete("/:id", authenticate, CartItemController.removeCartITem);

module.exports = router;
