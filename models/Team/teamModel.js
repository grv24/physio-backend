const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const teamSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

teamSchema.plugin(uniqueValidator);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
