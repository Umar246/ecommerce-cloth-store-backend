const CartItemService = require("../Services/CartItemService");

//* UPDATE CART ITEM
const updateCartITem = async (req, res) => {
  const user = req.user;
  try {
    const updatedItem = await CartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updatedItem);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//* REMOVE CART ITEM
const removeCartITem = async (req, res) => {
  const user = req.user;
  let userId = user._id.toString()

  try {
    const removedItem = await CartItemService.removeCartItem(
      req.params.id,
      userId
    );
    console.log("removedItem ", removedItem);
    return res.status(200).send({
      message: "Cart item removed successfully",
      cartItemId: removedItem._id,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const CartItemController = {
  updateCartITem,
  removeCartITem,
};
module.exports = CartItemController;
