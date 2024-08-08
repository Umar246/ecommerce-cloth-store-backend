const CartItem = require("../Models/cartItemModel");
const UserService = require("../Services/UserService");

//* UPDATE CART ITEM
const updateCartItem = async (userID, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("Cart item not found: ", cartItemId);
    }

    const user = await UserService.findUserById(item.userId);

    if (!user) {
      throw new Error("User not found: ", userID);
    }

    if (userID.toString() === user._id.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//* REMOVE CART ITEM
const removeCartItem = async (itemId, userID) => {
  try {
    itemId = itemId.toString();

    const item = await findCartItemById(itemId);

    if (!item) {
      throw new Error("Item not found: ", itemId);
    }

    const user = await UserService.findUserById(item.userId);

    if (!user) {
      throw new Error("User not found: ", userID);
    }

    if (item.userId.toString() == user._id.toString()) {
      const removedItem = await CartItem.findByIdAndDelete(itemId);
      return removedItem;
    } else {
      throw new Error("You can't remove another user's item");
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND WHOLE CART_ITEM BY ID
const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId);

    if (cartItem) {
      return cartItem;
    } else {
      throw new Error("Cart item not found with this id: ", cartItemId);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const CartItemService = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
module.exports = CartItemService;
