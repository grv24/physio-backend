const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Subscription = require("../models/Subscription/subscriptionModel");
const User = require("../models/User/userModel");
const moment = require("moment");
const sendSubscriptionMails = require("../controllers/Email/subscriptionExpired");
const subscribed = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Found! with this Email" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Password does not match!" });
    }
    if (user.isVerified == false) {
      return res.status(400).json({ message: "User Not Verified!" });
    }

    const subscription = await Subscription.findOne({ user: user.id });
    // subscription =true
    if (subscription) {
      const date1 = moment(subscription.expiryDate, "DD-MM-YYYY");
      console.log(date1);
      const currentDate = moment();
      const date2 = currentDate.format("DD-MM-YYYY");
      console.log(date2);
      const diffInDays = date1.diff(currentDate, "days");
      console.log(diffInDays);
      // let diffInDays = 0;
      if (diffInDays === 0) {
        console.log("Your subscription expiry date is today");
        req.subscription = subscription;
        token = generateToken(user.id);
        await sendSubscriptionMails(user.fname, email);
      } else if (diffInDays > 0) {
        req.subscription = subscription;
        console.log("Your subscription expiry date is in the future");
      } else {
        console.log("Your subscription has expired!");
      }
    }

    console.log(subscription);
    req.user = user;
    req.password = password;

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = { subscribed };
