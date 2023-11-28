const BuyIssue = require("../../models/Subscription/buyIssue");
const Subscription = require("../../models/Subscription/subscriptionModel");
const User = require("../../models/User/userModel");
const moment = require("moment");

const buyIssue = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    const { currentDate, issueId, price, issueType } = req.body;

    if (!currentDate || !issueId) {
      return res.status(400).json({ message: "Please select a issue" });
    }
    let myCurrentDate = moment(currentDate, "DD-MM-YYYY").format("DD-MM-YYYY");

    const buyIssue = await Subscription.create({
      user: req.user.id,
      currentDate: myCurrentDate,
      issueId: issueId,
      price: price,
      issueType: issueType,
    });

    if (buyIssue) {
      return res.status(201).json(buyIssue);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getBuyIssue = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not Logged In!" });
    }
    const subscription = await BuyIssue.find({ user: req.user.id });
    if (!subscription) {
      return res.status(400).json({
        message: "You have not subscribed yet Please Subscribe!",
      });
    } else {
      return res.status(200).json({
        data: subscription,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  buyIssue,
  getBuyIssue,
};
