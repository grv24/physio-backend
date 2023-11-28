const express = require("express");
const router = express.Router();
const { body, oneOf } = require("express-validator");
const {
  createAdmin,
  createUser,
  closeUserAccount,
  changeUserPassword,
  addJournal,
  updateJournal,
  updatemanuscriptActivity,
  allAuthors,
  getAllSubmittedManuscriptOfAuthorsWithAuthorId,
  getAllLatestSubmittedManuscript,
  getAllOrders,
  getUserOrders
} = require("../controllers/adminControls");
const AdminAuth = require("../middleware/adminAuth");
const { adminProtect } = require("../middleware/authMiddleware");

const {
  allUsers,
  userData,
  accountLockUnlock,
  getAdminDetails,
  updateAdminDetails,
} = require("../controllers/adminControls");
const verifyPassword = require("../middleware/verifyPassword");
const UserAuth = require("../middleware/userAuth");

// Register as admin
router.post(
  "/createadmin",
  [
    body("emailId", "Mail-Id is required").notEmpty(),
    body("userName", "UserName is required").notEmpty(),
    body("password", "password is required").notEmpty(),
    body("password", "min length of 5 is required for Password").isLength({
      min: 5,
    }),
    body("completeAddress", "Complete Address is required").notEmpty(),
    body("country", "country name is required").notEmpty(),
    body("state", "state is required").notEmpty(),
    body("city", "city is required").notEmpty(),
    body("zip", "zip code is required").notEmpty(),
    body("mobile", "mobile number is required").notEmpty(),
  ],
  createAdmin
);

// Creating Id's Routes By Admin
router.post(
  "/createUser",
  AdminAuth,
  [
    body("emailId", "Mail-Id is required").notEmpty(),
    body("userName", "UserName is required").notEmpty(),
    body("password", "password is required").notEmpty(),
    body("password", "min length of 5 is required for Password").isLength({
      min: 5,
    }),
    body("role", "role is required").notEmpty(),
    body("role", "role should be a integer value")
      .isNumeric()
      .isLength({ min: 0, max: 4 }),
  ],
  createUser
);

// Add Journal ( only by admin )
router.post(
  "/addjournal",
  AdminAuth,
  [
    body("JournalTitle", "Journal Title is required").notEmpty(),
    body("AboutJournal", "About Journal is required").notEmpty(),
    body(
      "AboutJournalPublication",
      "About Journal Publication is required"
    ).notEmpty(),
  ],
  addJournal
);

// Update Journal ( only by admin )
router.put(
  "/updatejournal/:journalId",
  AdminAuth,
  [
    body("JournalTitle", "Journal Title is required").notEmpty(),
    body("AboutJournal", "About Journal is required").notEmpty(),
    body(
      "AboutJournalPublication",
      "About Journal Publication is required"
    ).notEmpty(),
  ],
  updateJournal
);

//admin opening or closing staff accounts
router.post("/accountLockUnlock/:userId", AdminAuth, accountLockUnlock);

//admin deleting staff accounts
router.post("/closestaffAccount/:userId", AdminAuth, closeUserAccount);

// Admin Changing Staff Passwords
router.post(
  "/changeDownlinePassword/:userId",
  AdminAuth,
  verifyPassword,
  changeUserPassword
);

// update final submit manuscript-sixth-form
router.put(
  "/updatemanuscriptActivity/:manuscriptId",
  AdminAuth,
  updatemanuscriptActivity
);

//get Route Admin Details
router.get("/admin/details", adminProtect, getAdminDetails);

//admin changing its details
router.put("/admin/updateDetails", adminProtect, updateAdminDetails);

//USERS---------------------------------------------->>
//GET ALL USERS Routes
router.get("/admin/allUsers", adminProtect, allUsers);

//AUTHORS ---------------------------------------------->>
//GET ALL AUTHORS Routes
router.get("/admin/allauthors", allAuthors);

//Authors Submitted Manuscripts
router.get(
  "/getallsubmittedmanuscript/:authorid",
  adminProtect,
  getAllSubmittedManuscriptOfAuthorsWithAuthorId
);

//GET Latest Submitted Manuscripts
router.get(
  "/getallsubmittedlatestmanuscript",
  adminProtect,
  getAllLatestSubmittedManuscript
);

//GET ALL ORDERS
router.get("/orders/all", adminProtect, getAllOrders);

//GET USER ORDERS
router.get("/users/orders/:customerId", adminProtect, getUserOrders);

module.exports = router;
