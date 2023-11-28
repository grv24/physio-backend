const CommingSoon = require("../../models/MobileApp/commingSoonModel");
const fs = require("fs");

const commingSoon = async (req, res) => {
  try {

    let file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please enter freeIssues Img!" });
    }
    const data1 = await CommingSoon.findOne();
    if (data1) {
      return res.status(400).json({ message: "Another Image already Exist, You can update it!" });
    }

    const data = await CommingSoon.create({
      commingSoon: file.path,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while uploading Img." });
    }
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const getCommingSoon = async (req, res) => {
  try {
    const data = await CommingSoon.find();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Image Uploaded Yet!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const updateCommingSoon = async (req, res) => {
  try {

    let file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No File Updated!" });
    }
    const data = await CommingSoon.findOne();
    if (!data) {
      return res.status(400).json({ message: "Data Not Found!" });
    }
    const commingSoon = data.commingSoon;

    if (file) {
      if (commingSoon) {
        fs.unlink(commingSoon, (err, pic) => {
          if (err) return;
          return;
        });
      }
      data.commingSoon = file.path;
    }
    await data.save();
    return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  commingSoon,
  getCommingSoon,
  updateCommingSoon,
};
