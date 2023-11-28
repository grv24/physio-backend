const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const networksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your first name"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
    },
    location: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

networksSchema.plugin(uniqueValidator);

const Network = mongoose.model("Network", networksSchema);

module.exports = Network;
