const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../../middleware/authMiddleware");
const upload = require("../../middleware/imgUpload");
const {
  createAnnualSubscription,
  getAnnualSubscription,
  updateAnnualSubscription,
  getAllAnnualSubscription,
  getAnnualSubscriptionForSubscribedUser,
} = require("../../controllers/issue/annualSubscription");
const { checkSubscription } = require("../../middleware/checksubscription");

//Buy Subscription
//Post annual-Subscription
router.post(
  "/annual-subscription",
  adminProtect,
  upload("annualSubscription").fields([
    { name: "defaultPicture", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  createAnnualSubscription
);

//Get annual-Subscription
router.get("/annual-subscription", getAnnualSubscription);

//Get annual-Subscription
router.get("/admin/annual-Subscription",adminProtect, getAllAnnualSubscription);

//Get annual-Subscription for user
router.get("/subscribeduser/annual-Subscription", protect, checkSubscription, getAnnualSubscriptionForSubscribedUser);

//Patch annual-Subscription
router.put(
  "/annual-subscription/:id",
  adminProtect,
  upload("annualSubscription").fields([
    { name: "defaultPicture", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  updateAnnualSubscription
);

module.exports = router;
