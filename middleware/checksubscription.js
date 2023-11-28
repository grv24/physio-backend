const asyncHandler = require("express-async-handler");
const User = require("../models/User/userModel");
const AnnualSubscription = require("../models/issue/annualSubscription");
const Order = require("../models/Order/Order");

const checkSubscription = asyncHandler(async (req, res, next) => {
  let token;

  if (req.user) {
    try {
      const subscriptionIds = [];
      const usersubscriptionIds = [];
      const subscriptions = await AnnualSubscription.find().select("_id");

      subscriptions.forEach((subscription) => {
        subscriptionIds.push(subscription._id.toString());
      });

      const orders = await Order.find({ user: req.user._id });

      if (orders.length > 0) {
        orders.forEach((order) => {
          order.products.forEach((product) => {
            if (subscriptionIds.includes(product.subscriptionId.toString())) {
              usersubscriptionIds.push(product.subscriptionId.toString());
            }
          });
        });
      }

      req.usersubscriptionIds = usersubscriptionIds;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { checkSubscription };