const ReviewService = require("../Services/ReviewService");

//* CREATE REVIEW
const createReview = async (req, res) => {
  const user = req.user;
  console.log("DATA : ",req.body);
  
  try {
    const review = await ReviewService.createReview(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  
  try {
    const reviews = await ReviewService.getAllReviews(productId);
    return res.status(201).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const ReviewController = {
  createReview,
  getAllReviews,
};
module.exports = ReviewController;
