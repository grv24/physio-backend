const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const socialMediaLinksSchema = mongoose.Schema({
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

socialMediaLinksSchema.plugin(uniqueValidator);

const SocialMediaLink = mongoose.model("SocialMediaLink", socialMediaLinksSchema);

module.exports = SocialMediaLink;
