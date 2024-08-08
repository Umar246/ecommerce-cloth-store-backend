const CartService = require("../Services/CartService");

//* FIND USER CART
const findUserCart = async (req, res) => {
  //?  Jab middleware use karna ha tab user pas karna ha
  const user = req.user;   // Jab hum rotes wali file ma route define kar rahe ha tou udr aik function authenticate ko call kar rahe ha ya user waha sy mil raha ha 
  try {
    const cart = await CartService.findUserCartAndTotal(user._id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//* ADD ITEM TO CART
const addItemToCart = async (req, res) => {
  //?  Jab middleware use karna ha tab user pas karna ha
  const user = req.user;

  try {
    const cartItem = await CartService.addToCart(user._id, req.body);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const CartController = {
  findUserCart,
  addItemToCart,
};
module.exports = CartController;
