const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../../middleware/authMiddleware');
const { advertisementPoster, getAdvertisementPoster, updateAdvertisementPoster } = require('../../controllers/Advertisement/advertisementPoster');
const { advertisementPartners, getAdvertisementPartners,updateAdvertisementPartners, deleteAdvertisementPartners } = require('../../controllers/Advertisement/advertisementPartners');
const {advertisementFooterPoster,getAdvertisementFooterPoster, updateAdvertisementFooterPoster}  = require('../../controllers/Advertisement/advertisementFooterPoster');
const { advertisementType, getAdvertisementType, updateAdvertisementType, } = require('../../controllers/Advertisement/advertisementType');
const {aboutAdvertisement, getAboutAdvertisement, updateAboutAdvertisement} = require('../../controllers/Advertisement/aboutAdvertisement');
const {advertisementRate, getAdvertisementRate, updateAdvertisementRate}  = require('../../controllers/Advertisement/advertisementRate');

const inquiryForms  = require('../../controllers/Advertisement/advertisementInquiry');
const upload  = require('../../middleware/imgUpload');


// AdvertismentPartners section

router.post('/advertisment/partners',adminProtect,upload('advertisement/partners').single('logo'), advertisementPartners);
router.get('/advertisment/partners', getAdvertisementPartners);
router.patch('/advertisment/partners/:id',adminProtect,upload('advertisement/partners').single('logo'),updateAdvertisementPartners);
router.delete('/advertisment/partners/:id', adminProtect, deleteAdvertisementPartners);

// ADVERTISEMENT POSTER ROUTES

router.get('/advertisement/poster',getAdvertisementPoster);
router.post('/advertisement/poster',adminProtect,upload(`advertisement/poster`).single('poster'), advertisementPoster);
router.patch('/advertisement/poster', adminProtect, upload(`advertisement/poster`).single('poster'), updateAdvertisementPoster);

// ADVERTISEMENT FOOTER POSTER ROUTES

router.get('/advertisement/footerPoster',getAdvertisementFooterPoster);
router.post('/advertisement/footerPoster',adminProtect, upload(`advertisement/footerPoster`).single('footerPoster'), advertisementFooterPoster);
router.patch('/advertisement/footerPoster',adminProtect, upload(`advertisement/footerPoster`).single('footerPoster'), updateAdvertisementFooterPoster);

// ADVERTISEMENT TYPES ROUTES

router.get('/advertisement/types',getAdvertisementType );
router.post('/advertisement/types', adminProtect, upload(`advertisement/advertisementType`).single('advertisementType'), advertisementType);
router.patch('/advertisement/types', adminProtect, upload(`advertisement/advertisementType`).single('advertisementType'), updateAdvertisementType);


//  ADVERTISEMENT INQUIRY FORM ROUTES

router.post('/advertisement/inquiry', inquiryForms );


// ABOUT ADVERTISEMENT ROUTES

router.get('/advertisement/about', getAboutAdvertisement);
router.post('/advertisement/about',adminProtect, aboutAdvertisement);
router.patch('/advertisement/about', adminProtect, updateAboutAdvertisement);


//  ADVERTISEMENT RATE ROUTES

router.get('/advertisement/rate', getAdvertisementRate);
router.post('/advertisement/rate', adminProtect, advertisementRate );
router.patch('/advertisement/rate', adminProtect, updateAdvertisementRate );

module.exports = router; 