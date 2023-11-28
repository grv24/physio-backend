const AdvertisementType = require("../../models/Advertisement/advertisementTypeModel");
const fs = require("fs");

const advertisementType = async (req, res) => {
  try {
      let file = req.file;
      console.log(file);

    if (!file) {
      return res.status(400).json({ message: "Please Enter Advertisement Type Img!" });
    }
    const data1 = await AdvertisementType.findOne();
    if (data1) {
      return res.status(400).json({ message: "Another Image Already Exist, You can only update it!" });
    }
    const data = await AdvertisementType.create({
        advertisementType: file.path,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while uploading Img!" });
    }
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const getAdvertisementType = async (req, res) => {
  try {
    const data = await AdvertisementType.findOne();

    if (!data) {
      return res.status(404).json({ message: "No Image Uploaded Yet!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const updateAdvertisementType = async (req, res) => {
  try {

    let file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No File Updated!" });
    }
    const data = await AdvertisementType.findOne();
    if (!data) {
      return res.status(400).json({ message: "Data Not Found!" });
    }
    const logo = data.advertisementType;

    if (file) {
      if (logo) {
        fs.unlink(logo, (err, pic) => {
          if (err) return;
          return;
        });
      }
      data.advertisementType = file.path;
    }
    await data.save();
    return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    advertisementType,
  getAdvertisementType,
  updateAdvertisementType,
};
