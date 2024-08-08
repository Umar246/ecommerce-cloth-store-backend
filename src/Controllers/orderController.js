const OrderService = require("../Services/OrderService");

//* CREATE ORDER
const createOrder = async (req, res) => {
  const user = await req.user;
  console.log(req.body);
  
  try {
    let createdOrder = await OrderService.createOrder(user, req.body);
    return res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* FIND ORDER BY ID
const findOrderById = async (req, res) => {
  // const user = await req.user;
  try {
    let order = await OrderService.findOrderById(req.params.id);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//*  ORDER HISTORY
const orderHistory = async (req, res) => {
  const user = await req.user;
  try {
    let orders = await OrderService.userOrderHistory(user._id);
    console.log("orders: ", orders);
    
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const OrderController = {
  createOrder, 
  findOrderById,
  orderHistory,
};
module.exports = OrderController;
