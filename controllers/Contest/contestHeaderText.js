const ContestHeaderText = require("../../models/Contest/contestHeaderModel");

const headerText = async (req, res) => {
  try {
    const { title, subTitle } = req.body;
    if (!title || !subTitle) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields!" });
    }

    const data = await ContestHeaderText.create({
      title,
      subTitle,
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

const getHeaderText = async (req, res) => {
  try {
    const data = await ContestHeaderText.find();
    if (data.length ==0) {
      return res.status(404).json({ message: "No data in Header Field!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const updateHeaderText = async (req, res) => {
  try {
    const { title, subTitle } = req.body;
    if (!title && !subTitle) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await ContestHeaderText.findOne();

    if (title) {
      data.title = title;
    }

    if (subTitle) {
      data.subTitle = subTitle;
    }
    await data.save();

   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  headerText,
  getHeaderText,
  updateHeaderText,
};
