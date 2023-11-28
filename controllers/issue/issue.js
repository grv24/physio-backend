const Issue = require("../../models/issue/issue");
const fs = require("fs");
const moment = require('moment');
const Article = require("../../models/Article/articleModel");

//LATEST-ISSUE
const createLatestIssue = async (req, res) => {
  try {
    const {
      content,
      price,
      issueNumber,
      volNumber,
      picture,
      publish_Month,
      publish_Year,
    } = req.body;

    if (!content || !price || !issueNumber || !volNumber) {
      return res
        .status(400)
        .json({ message: "Please enter all fields correctly!" });
    }

    const previousIssue = await Issue.findOne({}).sort({ _id: -1 });

    if (previousIssue) {
      previousIssue.issueStatus = "PAST";
      await previousIssue.save();
    }

    const newIssue = await Issue.create({
      content,
      price,
      issueNumber,
      volNumber,
      picture,
      publish_Month,
      publish_Year,
    });

    if (newIssue) {
      newIssue.issueUrl = `${process.env.ISSUEURL}${newIssue._id}`;
      await newIssue.save();
      return res.status(200).json(newIssue);
    } else {
      return res.status(400).json({
        message: "Something went wrong while creating the latest issue.",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getLatestIssue = async (req, res) => {
  try {
    const data = await Issue.findOne({ issueStatus: "LATEST" });
    if (data.length == 0) {
      return res.status(400).json({ message: "No Latest Issue Data Found! " });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateLatestIssue = async (req, res) => {
  try {
    const {
      content,
      price,
      issueNumber,
      volNumber,
      picture,
      publish_Month,
      publish_Year,
    } = req.body;

    if (!req.user) {
      return res.status(400).json({ message: "Admin not Logged In" });
    }

    const data = await Issue.findOne({ _id: req.params.id });

    // Check if content exists and assign it to data
    if (content) {
      data.content = content;
    }

    // Check if price exists and assign it to data
    if (price) {
      data.price = price;
    }

    // Check if issueNumber exists and assign it to data
    if (issueNumber) {
      data.issueNumber = issueNumber;
    }

    // Check if volNumber exists and assign it to data
    if (volNumber) {
      data.volNumber = volNumber;
    }

    // Check if volNumber exists and assign it to data
    if (picture) {
      data.picture = picture;
    }

    // Check if volNumber exists and assign it to data
    if (publish_Month) {
      data.publish_Month = publish_Month;
    }

    // Check if volNumber exists and assign it to data
    if (publish_Year) {
      data.publish_Year = publish_Year;
    }

    // Assign other fields
    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// PAST-ISSUE
const getAllPastIssues = async (req, res) => {
  try {
    const issues = await Issue.aggregate([
      {
        $match: {
          issueStatus: "PAST",
        },
      },
      {
        $sort: {
          publish_Year: -1,
          publish_Month: -1,
        },
      },
    ]);

    if (issues.length === 0) {
      return res.status(400).json({ message: "No Latest Issue Data Found!" });
    }

    const issueIds = issues.map((issue) => issue._id);
    const articles = await Article.find({ issue: { $in: issueIds } });

    const issueMap = new Map();
    issues.forEach((issue) => {
      issueMap.set(issue._id.toString(), { issue, articles: [] });
    });

    articles.forEach((article) => {
      const issueId = article.issue.toString();
      if (issueMap.has(issueId)) {
        const issueData = issueMap.get(issueId);
        issueData.articles.push(article);
        issueMap.set(issueId, issueData);
      }
    });

    const finalIssues = Array.from(issueMap.values());

    return res.status(200).json({ message: finalIssues });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


const getPastIssue = async (req, res) => {
  try {
    const data = await Issue.findOne({ _id: req.params.id });
    if (data.length == 0) {
      return res.status(400).json({ message: "No Latest Issue Data Found! " });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updatePastIssue = async (req, res) => {
  try {
    const {
      content,
      price,
      issueNumber,
      volNumber,
      picture,
      publish_Month,
      publish_Year,
    } = req.body;

    if (!req.user) {
      return res.status(400).json({ message: "Admin not Logged In" });
    }

    const data = await Issue.findOne({ _id: req.params.id });

    // Check if content exists and assign it to data
    if (content) {
      data.content = content;
    }

    // Check if price exists and assign it to data
    if (price) {
      data.price = price;
    }

    // Check if issueNumber exists and assign it to data
    if (issueNumber) {
      data.issueNumber = issueNumber;
    }

    // Check if volNumber exists and assign it to data
    if (volNumber) {
      data.volNumber = volNumber;
    }

    // Check if volNumber exists and assign it to data
    if (picture) {
      data.picture = picture;
    }

    // Check if volNumber exists and assign it to data
    if (publish_Month) {
      data.publish_Month = publish_Month;
    }

    // Check if volNumber exists and assign it to data
    if (publish_Year) {
      data.publish_Year = publish_Year;
    }

    // Assign other fields
    await data.save();
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//GET ALL VOL
const getAllVol = async (req, res) => {
  try {
    const uniqueVolNumbers = await Issue.distinct("volNumber");
    if (uniqueVolNumbers.length == 0) {
      return res.status(400).json({ message: "No Volumes Data Found! " });
    }
    return res.status(200).json(uniqueVolNumbers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//GET ALL VOL
const getVolIssues = async (req, res) => {
  try {
    const data = await Issue.find({ vol: req.params.volNumber });
    if (data.length == 0) {
      return res
        .status(400)
        .json({ message: "No Issues found for this volume! " });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createLatestIssue,
  getLatestIssue,
  updateLatestIssue,
  getAllPastIssues,
  getPastIssue,
  updatePastIssue,
  getAllVol,
  getVolIssues,
};
