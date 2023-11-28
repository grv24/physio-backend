const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const advertisementRateSchema = mongoose.Schema(
  {
    advertisementRate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

advertisementRateSchema.plugin(uniqueValidator);

const AdvertisementRate = mongoose.model("AdvertisementRate", advertisementRateSchema);

module.exports = AdvertisementRate;
