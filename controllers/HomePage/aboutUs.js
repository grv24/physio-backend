const AboutUs = require("../../models/HomePage/aboutUsModel");

const aboutUsText = async (req, res) => {
  try {
    const { aboutUs } = req.body;
    if (!aboutUs) {
      return res
        .status(400)
        .json({ message: "Please enter About Your Company!" });
    }

    const data = await AboutUs.create({
      aboutUs,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while Creating AboutUs." });
    }
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const getAboutUsText = async (req, res) => {
  try {
    const data = await AboutUs.find();
    if (data.length == 0) {
      return res.status(400).json({ message: "No About us Data Found! " });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const updateAboutUsText = async (req, res) => {
  try {
    const { aboutUs } = req.body;
    
    if (!aboutUs) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    
    const data = await AboutUs.findOne();
    data.aboutUs = aboutUs;
    await data.save();
   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  aboutUsText,
  getAboutUsText,
  updateAboutUsText,
};
