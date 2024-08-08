const Reviews = require("../Models/reviewsModel");
const ProductService = require("./ProductService");

//* CREATE REVIEW
const createReview = async (reqData, user) => {
  const product = await ProductService.findProductById(reqData.productId);

  const review = await new Reviews({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });

  await product.save();
  return await review.save();
};

//* GET ALL REVIEWS BY PRODUCT ID
const getAllReviews = async (productId) => {
  const product = await ProductService.findProductById(productId);

  return await Reviews.find({ product: product._id }).populate("user");
};

const ReviewService = {
  createReview,
  getAllReviews,
};
module.exports = ReviewService;
