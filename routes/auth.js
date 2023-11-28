const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signout, signin, adminSignin, getalljounals } = require("../controllers/auth");

// **************************************

//Login In Route Admin
router.post(
  "/admin/signin",
  [
    body("emailId", "Mail-Id is required").notEmpty(),
    body("password", "password is required").notEmpty(),
    body("password", "min length of 3 is required for Password").isLength({
      min: 3,
    }),
  ],
  adminSignin
);

//Login In Routes (Except Admin)
router.post(
  "/signin",
  [
    body("emailId", "Mail-Id is required").notEmpty(),
    body("password", "password is required").notEmpty(),
    body("password", "min length of 3 is required for Password").isLength({
      min: 3,
    }),
    body("journalid", "journalid is required").notEmpty(),
  ],
  signin
);

//GET ALL JOURNALS
router.get(
  "/journals",
  getalljounals
);

//Logout Routes
router.post("/signout", signout);

module.exports = router;

// ************************************
