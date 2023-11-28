const AdvertisementRate = require("../../models/Advertisement/advertisementRateModel");

const advertisementRate = async (req, res) => {
  try {
      const { advertisementRate } = req.body;
    if (!advertisementRate) {
      return res.status(400).json({ message: "Please enter your Advertisement Rate!" });
    }
      const data1 = await AdvertisementRate.findOne();
      if (data1) {
          return res.status(400).json({message: "Data Already Exist"})
      }
    const data = await AdvertisementRate.create({
        advertisementRate,
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

const getAdvertisementRate = async (req, res) => {
  try {
    const data = await AdvertisementRate.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Advertisement Rate Field!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const updateAdvertisementRate = async (req, res) => {
  try {
    const { advertisementRate } = req.body;
    if (!advertisementRate) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await AdvertisementRate.findOne();

    if (advertisementRate) {
      data.advertisementRate = advertisementRate;
    }

    await data.save();

  return  res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    advertisementRate,
  getAdvertisementRate,
  updateAdvertisementRate,
};
