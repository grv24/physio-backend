const express = require('express')
const router = express.Router();

const { socialMediaLink, getSocialMediaLink, updateSocialMediaLink, deleteSocialMediaLink } = require('../../controllers/footer/socialMediaLinksController');
const { privacyPolicy, getPrivacyPolicy, updatePrivacyPolicy } = require('../../controllers/footer/privacyPolicy');
const { termsAndConditions, getTermsAndConditions, updateTermsAndConditions } = require('../../controllers/footer/termsAndConditions');
const { createFaqs, getFaqs, updateFaqs } = require('../../controllers/footer/faqsController');
const { disclaimer, getDisclaimer, updateDisclaimer } = require('../../controllers/footer/disclaimer');
const {returnPolicy,  getReturnPolicy,  updateReturnPolicy } = require('../../controllers/footer/returnPolicy');
const { refundPolicy, getRefundPolicy,  updateRefundPolicy } = require('../../controllers/footer/refundPolicy');
const { shippingPolicy, getShippingPolicy, updateShippingPolicy } = require('../../controllers/footer/shippingPolicy');
const { getInTouch, getGetInTouch, updateGetInTouch } = require('../../controllers/footer/getInTouchController');


const { adminProtect } = require('../../middleware/authMiddleware');

const upload =require('../../middleware/imgUpload');

// SOCIAL MEDIA LINKS ROUTES

router.get('/social-media',getSocialMediaLink);
router.post('/social-media',adminProtect ,upload('socialMedia').single('logo'), socialMediaLink);
router.patch('/social-media/:id',adminProtect ,upload('socialMedia').single('logo'),  updateSocialMediaLink);
router.delete('/social-media/:id',adminProtect ,  deleteSocialMediaLink);

// PRIVACY POLICY ROUTES

router.get('/privacy-policy', getPrivacyPolicy);
router.post('/privacy-policy',adminProtect, privacyPolicy);
router.patch('/privacy-policy/:id', adminProtect, updatePrivacyPolicy);

// FAQS ROUTES

router.get('/faqs', getFaqs);
router.post('/faqs', adminProtect, createFaqs);
router.patch('/faqs/:id', adminProtect, updateFaqs);

// DISCLAIMER ROUTES

router.get('/disclaimer', getDisclaimer);
router.post('/disclaimer',adminProtect, disclaimer);
router.patch('/disclaimer/:id',adminProtect, updateDisclaimer);

// TERMS AND CONDITIONS ROUTES

router.get('/terms-And-Conditions', getTermsAndConditions);
router.post('/terms-And-Conditions', adminProtect ,termsAndConditions);
router.patch('/terms-And-Conditions/:id', adminProtect, updateTermsAndConditions);

// RETURN POLICY ROUTES

router.get('/return-Policy', getReturnPolicy);
router.post('/return-Policy', adminProtect, returnPolicy);
router.patch('/return-Policy/:id', adminProtect, updateReturnPolicy);

// REFUND POLICY ROUTES

router.get('/refund-Policy', getRefundPolicy);
router.post('/refund-Policy', adminProtect, refundPolicy);
router.patch('/refund-Policy/:id', adminProtect, updateRefundPolicy);

// SHIPPING POLICY ROUTES

router.get('/shipping-policy', getShippingPolicy);
router.post('/shipping-policy', adminProtect, shippingPolicy);
router.patch('/shipping-policy/:id', adminProtect, updateShippingPolicy);

// GET IN TOUCH ROUTES

router.get('/get-in-touch', getGetInTouch);
router.post('/get-in-touch', adminProtect, getInTouch);
router.patch('/get-in-touch/:id', adminProtect, updateGetInTouch);



module.exports = router; 