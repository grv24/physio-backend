const ContestBodyData = require("../../models/Contest/contestBodyDataModel");

const bodyText = async (req, res) => {
  try {
    const { bodyData } = req.body;
    if (!bodyData) {
      return res.status(400).json({ message: "Please enter bodyData fields!" });
    }

    const data = await ContestBodyData.create({
      bodyData,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating data." });
    }
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const getBodyText = async (req, res) => {
  try {
    const data = await ContestBodyData.find();
    if (data.length == 0) {
      return res.status(404).json({ message: "No data in Header Field!" });
    }
  return  res.status(200).json({ message: data });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const updateBodyText = async (req, res) => {
  try {
    const { bodyData } = req.body;
    if (!bodyData) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await ContestBodyData.findOne();

    if (bodyData) {
      data.bodyData = bodyData;
    }

    await data.save();

   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  bodyText,
  getBodyText,
  updateBodyText,
};
