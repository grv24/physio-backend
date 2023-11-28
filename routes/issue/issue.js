const express = require('express');
const router = express.Router();
const {protect, adminProtect} = require('../../middleware/authMiddleware');
const { createLatestIssue, getLatestIssue, updateLatestIssue, getAllPastIssues, getPastIssue, updatePastIssue, getAllVol, getVolIssues } = require('../../controllers/issue/issue');
const upload = require('../../middleware/imgUpload');


//Get All Past Issues
router.get("/past-issues", getAllPastIssues);

//Get Single Past Issue
router.get("/past-issue/:id", getPastIssue);

//Patch All Past Issues
router.patch("/past-issue/:id", adminProtect, updatePastIssue);

//Post Latest-Issue
router.post("/latest-issue", adminProtect, createLatestIssue);

//Get Latest-Issue
router.get("/latest-issue", getLatestIssue);

//Patch Latest Issues
router.patch("/latest-issue/:id", adminProtect, updateLatestIssue);

//Get All Vol
router.get("/all-vol", getAllVol);

//Get All Issues of Vol
router.get("/vol/all-issues/:volNumber", getVolIssues);


module.exports = router