const Order = require("../../models/Order/Order");

const generateOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    const {
      cartItems, userAddress, Bill_Amount
    } = req.body;

    const subscription = await Order.create({
      user: req.user.id,
      products:cartItems,
      address:userAddress,
      Bill_Amount:Bill_Amount,
      Payment_mode:"Payonline"
    });

    if (subscription) {
      return res.status(201).json(subscription);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not Logged In!" });
    }
    const order = await Order.find({ user: req.user.id });
    if (!order) {
      return res.status(300).json({
        message: "You have not subscribed yet Please Subscribe!",
      });
    }
      return res.status(200).json(order)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateOrderOnPaymentSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not logged in" });
    }

    const order = await Order.findOne({ _id: req.params.orderId });

    if (!order) {
      return res.status(300).json({
        message: "No Order Found",
      });
    }

    order.transaction = req.body.transaction;
    order.payment_Status = "Success";

    order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateOrderOnPaymentFailure = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not logged in" });
    }

    const order = await Order.findOne({ _id: req.params.orderId });

    if (!order) {
      return res.status(300).json({
        message: "No Order Found",
      });
    }

    order.payment_Status = "Failed";

    order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteOrderOnPaymentNotSuccess = async (req, res) => {
  try {

    const order = await Order.findOne({ _id: req.params.orderId });

    if (!order) {
      res.status(300).json({
        message: "No Order Found",
      });
    }
    order.remove();

    return res
      .status(200)
      .json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  generateOrder,
  getOrder,
  updateOrderOnPaymentSuccess,
  updateOrderOnPaymentFailure,
  deleteOrderOnPaymentNotSuccess,
};
