const express = require('express')
const router = express.Router();
const {createTeamMember,  getTeamMember,  updateTeamMemberById,  deleteTeamMemberById,} = require('../../controllers/Team/teamController');
const { adminProtect } = require('../../middleware/authMiddleware');

const upload =require('../../middleware/imgUpload');


// TEAM MEMBERS SECTION

router.get('/team-member',getTeamMember);
router.post('/team-member', adminProtect,upload('team').single('pic'), createTeamMember);
router.patch('/team-member/:id', adminProtect,upload('team').single('pic'), updateTeamMemberById);
router.delete('/team-member/:id',adminProtect,upload('team').single('pic'), deleteTeamMemberById );

module.exports = router; 
