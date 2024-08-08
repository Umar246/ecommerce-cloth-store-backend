// TODO: Cart VS CartItem
// Cart: Is project ma mujy 2 terms confuse kar rahi thi cart or cartItem, cart ka mtlab ha cart k sari items or us ki calculations wgra
// CartItem: or cartItem ka mtlab cart k andar add hone wali ik single product ha 
const mongoose = require("mongoose");

//* CART CARD INFO (E.g; No. of items, price, total price etc)
const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItems",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalItem: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
