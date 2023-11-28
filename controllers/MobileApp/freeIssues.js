const FreeIssues = require("../../models/MobileApp/freeIssues");
const fs = require("fs");

const freeIssues = async (req, res) => {
  try {

    let file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please enter freeIssues Img!" });
    }
    const data1 = await FreeIssues.findOne();
    if (data1) {
      return res.status(400).json({ message: "Another Image Already Exist, You can only update it!" });
    }
    const data = await FreeIssues.create({
      freeIssues: file.path,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while uploading Img." });
    }
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const getFreeIssues = async (req, res) => {
  try {
    const data = await FreeIssues.find();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Image Uploaded Yet!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const updateFreeIssues = async (req, res) => {
  try {

    let file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No File Updated!" });
    }
    const data = await FreeIssues.findOne();
    if (!data) {
      return res.status(400).json({ message: "Data Not Found!" });
    }
    const logo = data.freeIssues;

    if (file) {
      if (logo) {
        fs.unlink(logo, (err, pic) => {
          if (err) return;
          return;
        });
      }
      data.freeIssues = file.path;
    }
    await data.save();
    return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  freeIssues,
  getFreeIssues,
  updateFreeIssues,
};
