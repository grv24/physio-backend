const express = require('express')
const router = express.Router()
const {submitArticles, getSubmitArticlesByIssueId, uploadYourFiles, updateSubmitArticles, deleteFileAtIndex, getAllArticles, getArticlesByArticleId, getTopMagazines} = require('../../controllers/Article/submitArticleController');
const {adminProtect} = require('../../middleware/authMiddleware');
const upload = require('../../middleware/imgUpload');

//Upload Files  ------------>>>>>
router.post("/submit-article/files", adminProtect,  upload('articlesFiles').array('files'),uploadYourFiles);

router.delete("/submit-article/:id", adminProtect, deleteFileAtIndex);
//<<<<<------------- Upload Files

// Articles Inside Issue -------------->>>>>>>
//Get All Article
router.get("/allarticles", getAllArticles);

//Get All Article Inside Issue
router.get("/issue/article/:issueId", getSubmitArticlesByIssueId);

//Get Single Article Inside Issue with article Id
router.get("/article/:articleId", getArticlesByArticleId);

//Patch Single Article Inside Issue article Id
router.patch("/issue/article/:articleId", adminProtect, updateSubmitArticles);

//Post Single Article Inside Issue
router.post("/issue/article/:issueId", adminProtect, submitArticles);
// <<<<<<<<-------------- Articles Inside Issue

// Top Magazine
router.get("/topmagazines", getTopMagazines);

module.exports = router
 