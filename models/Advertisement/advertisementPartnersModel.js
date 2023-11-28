const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const advertisementSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please enter Company Name!"],
  },
  logo: {
    type: String,
    required: [true, "Please enter Company Website Logo!"],
  },
  link: {
    type: String,
    required: [true, "Please enter Company Website Link!"],
  },
});

advertisementSchema.plugin(uniqueValidator);

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
