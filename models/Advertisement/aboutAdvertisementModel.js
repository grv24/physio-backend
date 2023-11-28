const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const aboutAdvertisementSchema = mongoose.Schema(
  {
    aboutAdvertisement: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

aboutAdvertisementSchema.plugin(uniqueValidator);

const AboutAdvertisement = mongoose.model(
  "AboutAdvertisement",
  aboutAdvertisementSchema
);

module.exports = AboutAdvertisement;
