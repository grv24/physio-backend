const AboutAdvertisement = require("../../models/Advertisement/aboutAdvertisementModel");

const aboutAdvertisement = async (req, res) => {
  try {
      const { aboutAdvertisement } = req.body;
    if (!aboutAdvertisement) {
      return res.status(400).json({ message: "Please enter About Advertisement!" });
    }
      const data1 = await AboutAdvertisement.findOne();
      if (data1) {
          return res.status(400).json({message: "Data Already Exist"})
      }
    const data = await AboutAdvertisement.create({
        aboutAdvertisement,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating data." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAboutAdvertisement = async (req, res) => {
  try {
    const data = await AboutAdvertisement.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in About Advertisement!" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAboutAdvertisement = async (req, res) => {
  try {
    const { aboutAdvertisement } = req.body;
    if (!aboutAdvertisement) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await AboutAdvertisement.findOne();

    if (aboutAdvertisement) {
      data.aboutAdvertisement = aboutAdvertisement;
    }

    await data.save();

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    aboutAdvertisement,
  getAboutAdvertisement,
  updateAboutAdvertisement,
};
