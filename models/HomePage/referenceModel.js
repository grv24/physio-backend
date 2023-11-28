const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const referenceLinksSchema = mongoose.Schema({
  socialMediaName: {
    type: String,
    required: [true, "Please enter Company Name!"],
  },
  logo: {
    type: String,
   
  },
  link: {
    type: String,
    required: [true, "Please enter Company Website Link!"],
  },
});

referenceLinksSchema.plugin(uniqueValidator);

const ReferenceLink = mongoose.model("ReferenceLink", referenceLinksSchema);

module.exports = ReferenceLink;
