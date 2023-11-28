const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const advisoryBoardSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    designation: {
      type: String,
    },
    contribution1:{
      type: String,
    },
    contribution2:{
      type: String,
    },
    location:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

advisoryBoardSchema.plugin(uniqueValidator);

const AdvisoryBoard = mongoose.model("AdvisoryBoard", advisoryBoardSchema);

module.exports = AdvisoryBoard;
