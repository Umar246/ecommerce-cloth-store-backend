const Cart = require("../Models/cartModel");
const CartItem = require("../Models/cartItemModel");
const Products = require("../Models/productModel");

//* CREATE NEW CART WITH USER (This function calls when register api calls)
const createCart = async (user) => {
  try {
    const cart = new Cart({ user });

    const createdCart = await cart.save();

    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND USER's CART WITH USERID AND CALCULATE THE TOTAL AMOUNT
const findUserCartAndTotal = async (userId) => {
  try {
    let cart = await Cart.find({ user: userId }).populate("cartItems");

    let cartItems = await CartItem.find({ cart: cart.Id });

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscount = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* ADD TO CART / CREATE ITEM IN CART
const addToCart = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    const product = await Products.findById(req.productId);
    
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    
    if (!isPresent) {
      const cartItem = await new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      const createdCartItem = await cartItem.save();

      cart.cartItems.push(createdCartItem);

      await cart.save();
      
      return "Item added to cart successfully";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const CartService = {
  createCart,
  findUserCartAndTotal,
  addToCart,
};
module.exports = CartService;
