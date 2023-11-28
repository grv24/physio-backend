const moment = require("moment");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const issueSchema = mongoose.Schema({
  picture: String,
  content: { type: String, required: true, unique: true },
  publish_Month: { type: String, default: moment().format('MMMM') },
  publish_Year: { type: String, default: moment().format('YYYY') },
  issueStatus: {
    type: String,
    enum: ['PAST', 'LATEST'],
    default: "LATEST"
  },
  price: { type: Number },
  issueNumber: { type: Number },
  volNumber: { type: Number },
  issueUrl:{
    type: String
  }
});

issueSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Issue", issueSchema);

issueSchema.plugin(uniqueValidator);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;