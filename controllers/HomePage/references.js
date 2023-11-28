const ReferenceLink = require("../../models/HomePage/referenceModel");
const fs = require("fs");

const referenceLink = async (req, res) => {
  try {
    const { socialMediaName, link } = req.body;

    let file = req.file;

    if (!socialMediaName || !file || !link) {
      return res
        .status(400)
        .json({ message: "Please enter all the required fields!" });
    }

    const data = await ReferenceLink.create({
      socialMediaName,
      logo: file.path,
      link,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating data." });
    }
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const getReferenceLink = async (req, res) => {
  try {
    const data = await ReferenceLink.find();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Social Media Yet!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const updateReferenceLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { socialMediaName, link } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please enter a valid id!" });
    }
    let file = req.file;

    if (!socialMediaName && !file && !link) {
      return res.status(400).json({ message: "No Data Updated!" });
    }
    const data = await ReferenceLink.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Data with this ID Not Found!" });
    }
    const logo = data.logo;
    
    if (socialMediaName) {
      data.socialMediaName = socialMediaName;
    }
    if (link) {
      data.link = link;
    }
      if (file) {
        if (logo) {
            fs.unlink(logo, (err, pic) => {
              if (err) return;
              return;
            });
          }
      data.logo = file.path;
    }
    await data.save();
    return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const deleteReferenceLink = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please enter a valid id!" });
    }
    const data = await ReferenceLink.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Data with this ID Not Found!" });
    }
    const logo = data.logo;
    if (logo) {
      fs.unlink(logo, (err, pic) => {
        if (err) return;
        return;
      });
    }

    await data.remove();
   return res.status(200).json({ message: "Data Deleted Successfully!" });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  referenceLink,
  getReferenceLink,
  updateReferenceLink,
  deleteReferenceLink,
};
