const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { changePassword } = require("../controllers/changePassword");
const UserAuth = require("../middleware/userAuth");

// Update own password
router.put(
  "/changepassword",
  UserAuth,
  [
    body("newPassword", "newPassword is required").notEmpty()
  ],
  changePassword
);

module.exports = router;
