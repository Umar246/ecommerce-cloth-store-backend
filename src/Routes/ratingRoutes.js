const express = require("express");
const router = express.Router();

const RatingController = require("../Controllers/ratingController");
const authenticate = require("../Middleware/authenticate");

router.post("/create", authenticate, RatingController.createRating);
router.get("/product/:productId", authenticate, RatingController.getAllRatings);

module.exports = router;
