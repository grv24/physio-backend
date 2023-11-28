const express = require("express");
const router = express.Router();
const { body, validationResult, oneOf } = require("express-validator");
const { forgotPassword, adminforgotPassword } = require("../controllers/forgotPassword");

// Update own password
//author
router.put(
  "/forgotpassword",
  [body("emailId", "Mail-Id is required").notEmpty()],
  forgotPassword
);

//admin
router.put(
  "/admin/forgotpassword",
  [body("emailId", "Mail-Id is required").notEmpty()],
  adminforgotPassword
);

module.exports = router;
