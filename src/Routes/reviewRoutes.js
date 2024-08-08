const express = require("express");
const router = express.Router();

const ReviewController = require("../Controllers/reviewController");
const authenticate = require("../Middleware/authenticate");

router.post("/create", authenticate, ReviewController.createReview);
router.get("/product/:id", authenticate, ReviewController.getAllReviews);

module.exports = router;
