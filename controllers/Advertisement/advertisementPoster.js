const AdvertisementPoster = require("../../models/Advertisement/advertisementPosterModel");
const fs = require("fs");

const advertisementPoster = async (req, res) => {
  try {

      let file = req.file;
      console.log(file);

    if (!file) {
      return res.status(400).json({ message: "Please Enter Poster Img!" });
    }
    const data1 = await AdvertisementPoster.findOne();
    if (data1) {
      return res.status(400).json({ message: "Another Image Already Exist, You can only update it!" });
    }
    const data = await AdvertisementPoster.create({
        advertisementPoster: file.path,
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

const getAdvertisementPoster = async (req, res) => {
  try {
    const data = await AdvertisementPoster.findOne();

    if (!data) {
      return res.status(404).json({ message: "No Image Uploaded Yet!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const updateAdvertisementPoster = async (req, res) => {
  try {

    let file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No File Updated!" });
    }
    const data = await AdvertisementPoster.findOne();
    if (!data) {
      return res.status(400).json({ message: "Data Not Found!" });
    }
    const logo = data.advertisementPoster;

    if (file) {
      if (logo) {
        fs.unlink(logo, (err, pic) => {
          if (err) return;
          return;
        });
      }
      data.advertisementPoster = file.path;
    }
    await data.save();
    return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    advertisementPoster,
  getAdvertisementPoster,
  updateAdvertisementPoster,
};
