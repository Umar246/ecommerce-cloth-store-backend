// TODO: Cart VS CartItem
// Cart: Is project ma mujy 2 terms confuse kar rahi thi cart or cartItem, cart ka mtlab ha cart k sari items or us ki calculations wgra
// CartItem: or cartItem ka mtlab cart k andar add hone wali ik single product ha
const mongoose = require("mongoose");

//* CART ITEMS (Jo b products cart ma add ki ho gi wo sabhi)
const CartItemSchema = mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const CartItem = mongoose.model("cartItems", CartItemSchema);
module.exports = CartItem;

