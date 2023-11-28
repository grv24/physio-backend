const express = require('express')
const router = express.Router();
const {
    createAdvisoryBoardMember,
    getAdvisoryBoardMember,
    getAdvisoryBoardMemberById,
    updateAdvisoryBoardMemberById,
    deleteAdvisoryBoardMemberById
} = require('../../controllers/AdvisoryBoard/advisoryBoardController');
const { adminProtect } = require('../../middleware/authMiddleware');
const upload =require('../../middleware/imgUpload');  

//ADVISORY BOARD ROUTES
router.get('/advisory-board',getAdvisoryBoardMember);
router.get('/advisory-board/:id', getAdvisoryBoardMemberById);
router.post('/advisory-board', adminProtect,upload('advisoryboard').single('pic'),createAdvisoryBoardMember);
router.patch('/advisory-board/:id', adminProtect,upload('advisoryboard').single('pic'),updateAdvisoryBoardMemberById);
router.delete('/advisory-board/:id',adminProtect, deleteAdvisoryBoardMemberById);

module.exports = router;