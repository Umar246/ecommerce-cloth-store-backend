const OrderService = require("../Services/OrderService");

//* GET ALL ORDERS CONTROLLER
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* CONFIRM ORDER CONTROLLER
const confirmedOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.confirmedOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* SHIPPED ORDER CONTROLLER
const shipOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.shipOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* DELIVERED ORDER CONTROLLER
const deliverdOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.deliveredOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* CANCELLED ORDER CONTROLLER
const cancelledOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.cancelledOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* DELETE ORDER CONTROLLER
const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.deleteOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const AdminOrderController = {
  getAllOrders,
  confirmedOrders,
  shipOrders,
  deliverdOrders,
  cancelledOrders,
  deleteOrders,
};
module.exports = AdminOrderController;
