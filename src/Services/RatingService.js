const Ratings = require("../Models/ratingsModel");
const ProductService = require("./ProductService");

//* CREATE REVIEW
const createRating = async (reqData, user) => {
  const product = await ProductService.findProductById(reqData.productId);

  const rating = new Ratings({
    user: user._id,
    product: product._id,
    review: reqData.rating,
    createdAt: new Date(),
  });

  return await rating.save();
};

//* GET ALL REVIEWS BY PRODUCT ID
const getAllRatings = async (productId) => {
  const product = await ProductService.findProductById(productId);

  return await Ratings.find({ product: product._id });
};

const ReviewService = {
  createRating,
  getAllRatings,
};
module.exports = ReviewService;
