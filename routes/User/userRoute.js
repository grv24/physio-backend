const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteAccount,
  forgotPassword,
  updateProfilePic,
} = require("../../controllers/User/userController");

const {
  generateOrder,
  getOrder,
  updateOrderOnPaymentSuccess,
  deleteOrderOnPaymentNotSuccess,
  updateOrderOnPaymentFailure,
} = require("../../controllers/Subscription/subscriptionController");

const { subscribed } = require("../../middleware/subscription");
const { protect } = require("../../middleware/authMiddleware");
const upload = require("../../middleware/imgUpload");
const { buyIssue, getBuyIssue } = require("../../controllers/Subscription/BuyIssue");
const accountSid = "ACa6b65f5bc9231a0a4cd3bc9d514f6f2b";
const authToken = "c52535486fc62e8ae8d20f67cd6c6a6e";
const client = require("twilio")(accountSid, authToken);

//AUTH
router.post("/users", registerUser);

router.post("/users/login", subscribed, loginUser);
router.get("/users", protect, getUserById);
router.patch("/users", protect, updateUser);
router.delete("/users", protect, deleteAccount);

//USER
router.patch("/users/forgotPassword", forgotPassword);

// USER PROFILE PIC UPDATE
router.patch(
  "/profilepic",
  protect,
  upload("profile").single("pic"),
  updateProfilePic
);

//SUBSCRIPTIONS
router.post("/users/subscription", protect, generateOrder);
router.get("/users/subscription", protect, getOrder);
router.put("/users/subscription/payment-success/:orderId", protect, updateOrderOnPaymentSuccess);
router.put("/users/subscription/payment-failure/:orderId", protect, updateOrderOnPaymentFailure);
router.delete("/users/subscription/:orderId", protect, deleteOrderOnPaymentNotSuccess);

// //send Otp
// router.post("/sendOtp", (req, res) => {
//   client.verify.v2
//     .services("MG4e2bb15b6931f6a5c60d3a8f13121419")
//     .verifications.create({ to: req.body.phoneNumber, channel: "sms" })
//     .then((verification) => console.log(verification.status));
// });

// router.get("/validateAccount", (req, res) => {
//   client.verify.v2
//     .services("AC2798df705d783a81d08d1e2510d86123")
//     .verificationChecks.create({ to: req.body.phoneNumber, code: req.body.code })
//     .then((verification_check) => console.log(verification_check.status));
// });

//ORDER ISSUE

module.exports = router;
