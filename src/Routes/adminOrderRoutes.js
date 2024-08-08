const express = require("express");
const router = express.Router();

const AdminOrderController = require("../Controllers/adminOrderController");
const authenticate = require("../Middleware/authenticate");

router.get("/", authenticate, AdminOrderController.getAllOrders);
router.put(
  "/:orderId/confirm",
  authenticate,
  AdminOrderController.confirmedOrders
);
router.put("/:orderId/ship", authenticate, AdminOrderController.shipOrders);
router.put(
  "/:orderId/deliver",
  authenticate,
  AdminOrderController.deliverdOrders
);
router.put(
  "/:orderId/cancel",
  authenticate,
  AdminOrderController.cancelledOrders
);
router.put("/:orderId/delete", authenticate, AdminOrderController.deleteOrders);

module.exports = router;
