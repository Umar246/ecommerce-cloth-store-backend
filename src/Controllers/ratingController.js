const RatingService = require("../Services/RatingService");

//* CREATE RATING
const createRating = async (req, res) => {
  const user = req.user;
  try {
    const rating = await RatingService.createRating(req.body, user); 
    return res.status(201).send(rating);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* GET ALL RATINGS
const getAllRatings = async (req, res) => {
  const productId = req.params.id;
  try {
    const ratings = await RatingService.getAllRatings(productId);
    return res.status(201).send(ratings);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const RatingController = {
  createRating,
  getAllRatings,
};
module.exports = RatingController;
