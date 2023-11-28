const AnnualSubscription = require("../../models/issue/annualSubscription");
const Issue = require("../../models/issue/issue");
const fs = require("fs");

const createAnnualSubscription = async (req, res) => {
  try {
    const { description, volNumber } = req.body;

    if (!description || !volNumber) {
      return res.status(400).json({
        message: "Please provide all required fields correctly!",
      });
    }

    const previousIssues = await Issue.find({ volNumber: volNumber });

    if (previousIssues.length === 0) {
      return res.status(400).json({
        message: "No previous issues found for the given volume number!",
      });
    }

    console.log(previousIssues);

    const volPictures = previousIssues.map((issue) => issue.picture);

    const annualSubscription = await AnnualSubscription.create({
      defaultPicture: req.files["defaultPicture"][0].path,
      pdfFile: req.files["pdfFile"][0].path,
      issuePicture: volPictures, // Modify based on your file upload implementation
      description: description,
      volNumber: volNumber,
      category: [
        { categoryType: "INDIVIDUAL", categoryPrice: 1219 },
        { categoryType: "INSTITUTION", categoryPrice: 1529 },
      ],
    });

    if (annualSubscription) {
      return res.status(201).json({
        message: "Annual subscription created successfully.",
        data: annualSubscription,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong while creating the annual subscription.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// For Free User Only
const getAnnualSubscription = async (req, res) => {
  try {
    const data = await AnnualSubscription.find().select('-pdfFile');
    if (data.length === 0) {
      return res.status(400).json({ message: "No Annual Subscription Found!" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


//For Admin Only
const getAllAnnualSubscription = async (req, res) => {
  try {
    const data = await AnnualSubscription.find();
    if (data.length == 0) {
      return res
        .status(400)
        .json({ message: "No Annual Subscription Found! " });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//For Subscribed User Only
const getAnnualSubscriptionForSubscribedUser = async (req, res) => {
  try {
    const data = [];
    for (const id of req.usersubscriptionIds) {
      const subscription = await AnnualSubscription.findOne({ _id: id }).select('pdfFile defaultPicture volNumber');
      if (subscription) {
        data.push(subscription);
      }
    }
    
    if (data.length === 0) {
      return res.status(400).json({ message: "No Annual Subscription Found!" });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateAnnualSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, volNumber } = req.body;

    if (!description || !volNumber) {
      return res.status(400).json({
        message: "Please provide all required fields correctly!",
      });
    }

    const previousIssues = await Issue.find({ volNumber: volNumber });

    if (previousIssues.length === 0) {
      return res.status(400).json({
        message: "No previous issues found for the given volume number!",
      });
    }

    const volPictures = previousIssues.map((issue) => issue.picture);

    const updatedSubscription = await AnnualSubscription.findById(id);

    if (!updatedSubscription) {
      return res.status(404).json({
        message: "Annual subscription not found.",
      });
    }

    // Delete previous default picture if a new one is uploaded
    if (req.files["defaultPicture"] && req.files["defaultPicture"][0]) {
      const previousDefaultPicture = updatedSubscription.defaultPicture;
      if (previousDefaultPicture) {
        // Delete previous default picture from the server
        fs.unlinkSync(previousDefaultPicture);
      }
      updatedSubscription.defaultPicture = req.files["defaultPicture"][0].path;
    }

    // Delete previous pdfFile if a new one is uploaded
    if (req.files["pdfFile"] && req.files["pdfFile"][0]) {
      const previousPdfFile = updatedSubscription.pdfFile;
      if (previousPdfFile) {
        // Delete previous pdfFile from the server
        fs.unlinkSync(previousPdfFile);
      }
      updatedSubscription.pdfFile = req.files["pdfFile"][0].path;
    }

    updatedSubscription.issuePicture = volPictures;
    updatedSubscription.description = description;
    updatedSubscription.volNumber = volNumber;
    updatedSubscription.category = [
      { categoryType: "INDIVIDUAL", categoryPrice: 1219 },
      { categoryType: "INSTITUTION", categoryPrice: 1529 },
    ];

    const savedSubscription = await updatedSubscription.save();

    if (savedSubscription) {
      return res.status(200).json({
        message: "Annual subscription updated successfully.",
        data: savedSubscription,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong while updating the annual subscription.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnnualSubscription,
  getAllAnnualSubscription,
  getAnnualSubscription,
  getAnnualSubscriptionForSubscribedUser,
  updateAnnualSubscription,
};