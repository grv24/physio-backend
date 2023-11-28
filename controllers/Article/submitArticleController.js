const Article = require("../../models/Article/articleModel");
const articleFiles = require("../../models/Article/articleFilesModel");
const fs = require("fs");

const uploadYourFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please select a file!." });
    }
    const data = await articleFiles.create({
      files: req.files.map((file) => {
        return file.path;
      }),
    });
    let url = [];
    for (let i = 0; i < data.files.length; i++) {
      let localhost = data.files[i];
      url.push(localhost);
    }
    let datas = { url: url, id: data._id };
    return res
      .status(201)
      .json({ message: "Data Created Successfully.", datas: datas });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteFileAtIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await articleFiles.findOne({ _id: id });
    const file = req.body.file;

    if (file) {
      if (file) {
        fs.unlink(file, (err, pic) => {
          if (err) return;
          return;
        });
      }
      const fileIndex = data.files.indexOf(file);
      if (fileIndex > -1) {
        data.files.splice(fileIndex, 1);
      }
    }
    if (data.files.length === 0) {
      await data.remove();
      let datas = { url: null, id: null };
      return res
        .status(200)
        .json({ message: "Data Deleted Successfully.", datas: datas });
    }
    await data.save();
    let url = [];
    for (let i = 0; i < data.files.length; i++) {
      let localhost = data.files[i];
      url.push(localhost);
    }
    let datas = { url: url, id: data._id };
    return res
      .status(201)
      .json({ message: "File Deleted Successfully.", datas: datas });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Post Article Inside Issue Id
const submitArticles = async (req, res) => {
  try {
    const { content,picture, topMagazine, articleType } = req.body;

    if (!req.params.issueId) {
      return res
        .status(400)
        .json({ message: "Please Enter a Valid Issue ID." });
    }
    if (!content) {
      return res
        .status(400)
        .json({ message: "Please enter data about Article Submission!" });
    }
    if (!picture) {
      return res
        .status(400)
        .json({ message: "Please enter default picture!" });
    }
    if (!articleType) {
      return res
        .status(400)
        .json({ message: "Please enter Article Type FREE OR PAID" });
    }
    

    const data = await Article.create({
      content,
      picture,
      topMagazine,
      articleType,
      issue: req.params.issueId,
    });
    
    if (data) {
      return res.status(200).json({ message: data });
    } else {
      return res
      .status(400)
      .json({ message: "Something wrong while creating Article Submition." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update Article With Article Id
const updateSubmitArticles = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content, articleType, topMagazine } = req.body;
    console.log(content);
    
    if (!articleId) {
      return res.status(400).json({ message: "Please enter a valid Article ID." });
    }

    if (!content && !articleType && topMagazine === undefined) {
      return res.status(400).json({ message: "No data updated!" });
    }

    const data = await Article.findById(articleId);
    if (!data) {
      return res.status(400).json({ message: "Submission article content not found with this ID." });
    }

    if (content) {
      data.submitArticles = content;
    }
    
    if (topMagazine !== undefined) {
      data.topMagazine = topMagazine;
    }

    if (articleType) {
      data.articleType = articleType;
    }

    await data.save();

    return res.status(200).json({ message: "Article updated successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


//Get Article Inside Issue Id
const getSubmitArticlesByIssueId = async (req, res) => {
  try {
    const data = await Article.find({ issue: req.params.issueId }).populate({
      path: 'issue',
      select: 'issueNumber volNumber _id',
    });
    if (data.length == 0) {
      return res.status(404).json({ message: "No data in Article!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get All Articles
const getAllArticles = async (req, res) => {
  try {
    const data = await Article.find().populate({
      path: 'issue',
      select: 'issueNumber volNumber _id',
    });
    if (data.length === 0) {
      return res.status(404).json({ message: "No data in Articles!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


//Get Article By Article Id
const getArticlesByArticleId = async (req, res) => {
  try {
    const data = await Article.findById(req.params.articleId);
    if (data.length == 0) {
      return res.status(404).json({ message: "No data in Articles!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get Top Magazines
const getTopMagazines = async (req, res) => {
  try {
    // Find articles with 'topMagazine' set to true
    const data = await Article.find({ topMagazine: true });

    // If no articles are found, return a 404 response
    if (data.length === 0) {
      return res.status(404).json({ message: "No Top Magazines found!" });
    }

    // Return the found articles with a 200 response
    return res.status(200).json({ message: data });
  } catch (error) {
    // Handle any errors and return a 400 response
    return res.status(400).json({ message: error.message });
  }
};


module.exports = {
  submitArticles,
  getArticlesByArticleId,
  uploadYourFiles,
  updateSubmitArticles,
  deleteFileAtIndex,
  getSubmitArticlesByIssueId,
  getAllArticles,
  getTopMagazines,
};
