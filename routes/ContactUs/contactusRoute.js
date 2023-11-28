const express = require('express')
const router = express.Router();
const sendMails = require("../../controllers/ContactUs/contactUsColtroller");

router.post("/sendmail", sendMails);

module.exports = router;