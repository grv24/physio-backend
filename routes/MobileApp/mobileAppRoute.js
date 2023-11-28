const express = require("express");
const router = express.Router();
const { adminProtect } = require("../../middleware/authMiddleware");
const {
  freeIssues,
  getFreeIssues,
  updateFreeIssues,
} = require("../../controllers/MobileApp/freeIssues");
const {
  commingSoon,
  getCommingSoon,
  updateCommingSoon,
} = require("../../controllers/MobileApp/commingSoon");
const upload = require("../../middleware/imgUpload");

//MOBILE APP COMMING SOON ROUTES

router.post(
  "/mobile-app/comming-soon",
  adminProtect,
  upload("mobileApp/commingSoon").single("Img"),
  commingSoon
);
router.get("/mobile-app/comming-soon", getCommingSoon);
router.patch(
  "/mobile-app/comming-soon",
  adminProtect,
  upload("mobileApp/commingSoon").single("Img"),
  updateCommingSoon
);

//MOBILE APP FREE ISSUES ROUTES

router.post(
  "/mobile-app/free-issues",
  adminProtect,
  upload("mobileApp/freeIssues").single("Img"),
  freeIssues
);
router.get("/mobile-app/free-issues", getFreeIssues);
router.patch(
  "/mobile-app/free-issues",
  adminProtect,
  upload("mobileApp/freeIssues").single("Img"),
  updateFreeIssues
);

module.exports = router;
