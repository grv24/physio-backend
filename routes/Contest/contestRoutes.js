const express = require('express')
const router = express.Router();
const { headerText, getHeaderText, updateHeaderText } = require('../../controllers/Contest/contestHeaderText');
const { bodyText, getBodyText, updateBodyText } = require('../../controllers/Contest/contestBodyData');
const { protect, adminProtect } = require('../../middleware/authMiddleware');





// CONTEST HEADER TEXT
router.post('/contest/headertext',adminProtect,headerText ); 
router.get('/contest/headertext',getHeaderText);
router.patch('/contest/headertext', adminProtect, updateHeaderText);


// CONTEST BODY TEXT(DATA)
router.post('/contest/bodydata', adminProtect, bodyText);
router.get('/contest/bodydata', getBodyText);
router.patch('/contest/bodydata', adminProtect, updateBodyText);


module.exports = router
