const express = require('express')
const router = express.Router();
const { adminProtect } = require('../../middleware/authMiddleware');
const {createNetworks,  getNetworks,  updateNetworksById, deleteNetworksById} = require('../../controllers/Networks/networksControllers');

const upload =require('../../middleware/imgUpload');



router.get('/networks',getNetworks);
router.post('/networks', adminProtect,upload('networks').single('pic'), createNetworks);
router.patch('/networks/:id', adminProtect,upload('networks').single('pic'), updateNetworksById);
router.delete('/networks/:id',adminProtect,upload('networks').single('pic'), deleteNetworksById );


module.exports = router;