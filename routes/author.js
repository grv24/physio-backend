const express = require("express");
const router = express.Router();
const fs = require("fs");
const { body } = require("express-validator");
const {
  AuthorSignup,
  verifyAuthor,
  updateAuthorInformation,
  submitManuscript,
  createManuscript_01,
  updatemanuscript_02,
  updatemanuscript_03,
  updatemanuscript_04,
  updatemanuscript_05,
  getmanuscript,
  deletemanuscript,
  addcoauthor,
  updatecoauthor,
  deletecoauthor,
  getcoauthors,
  upload,
  addreviewer,
  updatereviewer,
  deletereviewer,
  getreviewers,
  updatemanuscript_06,
  getAllManuscriptOfAuthorsWithJournalId,
  getAllSubmittedManuscriptOfAuthorsWithJournalId,
  updatemanuscript_01,
  deletedocument,
} = require("../controllers/author");

const UserAuth = require("../middleware/userAuth");

// **************************************

// Register as author
router.post(
  "/registerauthor",
  [
    body("emailId", "Mail-Id is required").notEmpty(),
    body("userName", "UserName is required").notEmpty(),
    body("password", "password is required").notEmpty(),
    body("password", "min length of 5 is required for Password").isLength({
      min: 5,
    }),
    body("completeAddress", "Complete Address is required").notEmpty(),
    body("country", "country name is required").notEmpty(),
    body("countrycode", "country code is required").notEmpty(),
    body("state", "state is required").notEmpty(),
    body("statecode", "statecode is required").notEmpty(),
    body("zip", "zip code is required").notEmpty(),
    body("mobile", "mobile number is required").notEmpty(),
    body("journalid", " journal-id not present").notEmpty(),
  ],
  AuthorSignup
);

// Author Verification
router.get("/authorverification", UserAuth, verifyAuthor);

// Upadte author as author
router.put("/updateauthor", UserAuth, updateAuthorInformation);

//Manuscript Routes ---------------------->

//create manuscript-first-form
router.post(
  "/createmanscript_01",
  UserAuth,
  [
    body("articleType", "Article Type is required").notEmpty(),
    body("issueType", "Issue Type is required").notEmpty(),
    body("policyText", "Policy Text is required").notEmpty(),
    body("policyAccepted", "First Accept The Policy").notEmpty(),
    body("policyAccepted", "First Accept The Policy").isBoolean(),
    body("journalid", "Journal-ID is required").notEmpty(),
  ],
  createManuscript_01
);

//update manuscript-first-form
router.put(
  "/updatemanuscript_01/:manuscriptId",
  UserAuth,
  updatemanuscript_01
);

// update manuscript-second-form
router.put("/updatemanuscript_02/:manuscriptId", UserAuth, updatemanuscript_02);

//adding co-authors
router.post(
  "/addcoauthor/:manuscriptId",
  UserAuth,
  [
    body("prefix", "Prefix is required").notEmpty(),
    body("emailId", "Mail-Id is required").notEmpty(),
    body("userName", "UserName is required").notEmpty(),
    body("country", "country name is required").notEmpty(),
    body("countrycode", "country code is required").notEmpty(),
    body("state", "state is required").notEmpty(),
    body("statecode", "state code is required").notEmpty(),
  ],
  addcoauthor
);

//update co-authors
router.put(
  "/updatecoauthor/:coauthorId",
  UserAuth,
  updatecoauthor
);

//delete co-authors
router.delete(
  "/deletecoauthor/:coauthorId",
  UserAuth,
  deletecoauthor
);

//get all co-authors
router.get("/getcoauthor/:manuscriptId", UserAuth, getcoauthors);

// update manuscript-third-form authors
router.put("/updatemanuscript_03/:manuscriptId", UserAuth, updatemanuscript_03);

// update manuscript-fourth-form AllFiles
router.put(
  "/updatemanuscript_04/:manuscriptId",
  UserAuth,
  upload.fields([
    {
      name: "titlePage",
      maxCount: 1,
    },
    {
      name: "coverLetter",
      maxCount: 1,
    },
    {
      name: "manuscript",
      maxCount: 1,
    },
    {
      name: "tables",
      maxCount: 1,
    },
    {
      name: "figures",
      maxCount: 1,
    },
    {
      name: "supplimentryFiles",
      maxCount: 1,
    },
    {
      name: "ethicalApproval",
      maxCount: 1,
    },
    {
      name: "coi",
      maxCount: 1,
    },
    {
      name: "fi",
      maxCount: 1,
    },
  ]),
  updatemanuscript_04
  );

// delete Document
router.delete("/deletedocument/:manuscriptId", UserAuth, deletedocument);

//adding reviewers
router.post(
  "/addreviewer/:manuscriptId",
  UserAuth,
  [
    body("prefix", "Prefix is required").notEmpty(),
    body("emailId", "Mail-Id is required").notEmpty(),
    body("userName", "UserName is required").notEmpty(),
    body("country", "country name is required").notEmpty(),
    body("countrycode", "country code is required").notEmpty(),
    body("state", "state is required").notEmpty(),
    body("statecode", "state code is required").notEmpty(),
  ],
  addreviewer
);

//update reviewers
router.put(
  "/updatereviewer/:reviewerId",
  UserAuth,
  updatereviewer
);

//delete reviewers
router.delete(
  "/deletereviewer/:reviewerId",
  UserAuth,
  deletereviewer
);

//get all reviewers
router.get("/getreviewers/:manuscriptId", UserAuth, getreviewers);

// update manuscript-fifth-form  reviewer
router.put("/updatemanuscript_05/:manuscriptId", UserAuth, updatemanuscript_05);

// update final submit manuscript-sixth-form
router.put("/updatemanuscript_06/:manuscriptId", UserAuth, updatemanuscript_06);

// get manuscript
router.get("/getmanuscript/:manuscriptId", UserAuth, getmanuscript);

// get all manuscript inside journal with author-id and journal-id
router.get("/journal/getallmanuscript/:journalid", UserAuth, getAllManuscriptOfAuthorsWithJournalId);

// delete manuscript completely
router.delete("/deletemanuscript/:manuscriptId", UserAuth, deletemanuscript);

// <--------------------- Manuscript Routes


// Submitted Manuscript Routes ---------------------->

router.get("/journal/getallsubmittedmanuscript/:journalid", UserAuth, getAllSubmittedManuscriptOfAuthorsWithJournalId);

// <--------------------- Submitted Manuscript Routes


module.exports = router;

// ************************************
