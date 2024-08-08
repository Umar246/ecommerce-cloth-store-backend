const Address = require("../Models/addressModel");
const OrderItem = require("../Models/orderItemsModel");
const Orders = require("../Models/orderModel");
const CartService = require("./CartService");

//* CREATE ORDER
const createOrder = async (user, shippAddress) => {
  try {
    let address;
    
    if (shippAddress._id) {
      let existedAddress = await Address.findById(shippAddress._id);
      address = existedAddress;
    } else {
      address = new Address(shippAddress);
      address.user = user;
      await address.save();
      
      user.address.push(address);
      await user.save();
    }
    
    const cart = await CartService.findUserCartAndTotal(user._id);
    const orderItems = [];
    
    for (const item of cart[0].cartItems) {
      const orderItem = await new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountedPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }
    
    const createdOrder = await new Orders({
      user,
      orderItems,
      shippingAddress: address,
      totalPrice: cart[0].totalPrice,
      totalDiscountedPrice: cart[0].totalDiscountedPrice,
      discount: cart[0].discount,
      totalItem: cart[0].totalItem,
    });
    
    const savedOrder = await createdOrder.save();

    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* PLACED ORDER
const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
};

//* CONFIRMED ORDER
const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
};

//* SHIPPED ORDER
const shipOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
};

//* DELIVERED ORDER
const deliveredOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
};

//* DELIVERED ORDER
const cancelledOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
};

//* FIND ORDER BY ORDER ID
const findOrderById = async (orderId) => {
  //TODO   POPULATE: Means is name ki attribute ki details ko expand kar do

  const order = await Orders.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};

//* USER'S ORDER HISTORY
const userOrderHistory = async (userId) => {
  try {
    const orders = await Orders.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* GET ALL ORDERS
const getAllOrders = async () => {
  const allOrders = await Orders.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();

  return allOrders;
};

//* DELETE ORDER BY ORDER ID
const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  const deletedOrder = await Orders.findByIdAndDelete(order._id);

  return deletedOrder;
};

const OrderService = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
module.exports = OrderService;
