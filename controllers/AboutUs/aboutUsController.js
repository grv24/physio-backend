const AboutUs = require("../../models/AboutUs/aboutUsModel");

const aboutUs = async (req, res) => {
  try {
      const { aboutUs } = req.body;

    if (!aboutUs) {
      return res
        .status(400)
        .json({ message: "Please enter About Us!" });
    }

    const data = await AboutUs.create({
        aboutUs,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating About Us!." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAboutUs = async (req, res) => {
  try {
    const data = await AboutUs.find();
    if (data.length == 0) {
      return res.status(404).json({ message: "No data in About Us!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;

    const { aboutUs } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }

    if (!aboutUs) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await AboutUs.findById(id);
    if (!data) {
      return res.status(400).json({ message: "About Us Data not Found With this ID." });
    }

    if (aboutUs) {
      data.aboutUs = aboutUs;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    aboutUs,
  getAboutUs,
  updateAboutUs,
};
