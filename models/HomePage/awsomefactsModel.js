const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const awsomeFactsSchema = mongoose.Schema({
  readers: {
    type: String,
  },
  citiesInIndia: {
    type: String,
  },
  facebookFans: {
    type: String,
  },
  expertAuthors: {
    type: String,
  },
});

awsomeFactsSchema.plugin(uniqueValidator);

const AwsomeFact = mongoose.model("AwsomeFact", awsomeFactsSchema);

module.exports = AwsomeFact;
