const express = require('express')
const router = express.Router();

const { testimonials, getTestimonials, updateTestimonialsById, deleteTestimonialsById } = require('../../controllers/Testmonials/testimonialsController');

const { adminProtect } = require('../../middleware/authMiddleware');

const upload =require('../../middleware/imgUpload');


// TESTMONIALS SECTION

router.get('/testmonials',getTestimonials);
router.post('/testmonials', adminProtect,upload('testimonials').single('testimonial'), testimonials);
router.patch('/testmonials/:id', adminProtect,upload('testimonials').single('testimonial'), updateTestimonialsById);
router.delete('/testmonials/:id',adminProtect,upload('testimonials').single('testimonial'), deleteTestimonialsById );

module.exports = router; 
