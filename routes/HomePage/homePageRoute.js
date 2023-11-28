const express = require('express')
const router = express.Router();
const { headerText, getHeaderText, updateHeaderText } = require('../../controllers/HomePage/myHeaderText');
const { aboutUsText, getAboutUsText, updateAboutUsText } = require('../../controllers/HomePage/aboutUs');
const { referenceLink, getReferenceLink, updateReferenceLink, deleteReferenceLink } = require('../../controllers/HomePage/references');
const { awsomeFactText, getAwsomeFactText, updateAwsomeFactText } = require('../../controllers/HomePage/awsomeFacts');

const { protect, adminProtect } = require('../../middleware/authMiddleware');

const upload =require('../../middleware/imgUpload');

// HomePage Header Text Section
router.post('/homepage/headertext',adminProtect,headerText ); 
router.get('/homepage/headertext',getHeaderText);
router.patch('/homepage/headertext',adminProtect,updateHeaderText);

// HomePage About Section

router.post('/homepage/aboutus',adminProtect, aboutUsText);
router.get('/homepage/aboutus', getAboutUsText);
router.patch('/homepage/aboutus',adminProtect, updateAboutUsText);

//HomePage Reference Section

router.post('/homepage/reference', adminProtect, upload('reference').single('logo'), referenceLink);
router.get('/homepage/reference', getReferenceLink);
router.patch('/homepage/reference/:id', adminProtect, upload('reference').single('logo'), updateReferenceLink);
router.delete('/homepage/reference/:id', adminProtect, deleteReferenceLink);

//HomePage AwsomeFacts Section

router.post('/homepage/awsomefacts', adminProtect, awsomeFactText);
router.get('/homepage/awsomefacts', getAwsomeFactText);
router.patch('/homepage/awsomefacts', adminProtect, updateAwsomeFactText);


module.exports = router 
