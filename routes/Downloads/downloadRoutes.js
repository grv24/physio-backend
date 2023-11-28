const express = require("express");
const router = express.Router();

const {uploadFile, getFile, getAllFiles,getFreeFiles, updateFileById} = require("../../controllers/Downloads/downloadController");
const {protect, adminProtect} = require('../../middleware/authMiddleware');

const  upload = require("../../middleware/upload");
const cpUpload = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'pdf', maxCount: 2 }])
router.post("/download", adminProtect, cpUpload, uploadFile);
router.get("/download", getAllFiles);
router.get("/download/:id", getFile);
router.patch("/download/:id", adminProtect, cpUpload, updateFileById)
module.exports = router  