const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const getInTouchSchema = mongoose.Schema(
  {
    mobile: {
      type: String,
    },

    email: {
      type: String,
    },
    companyName: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

getInTouchSchema.plugin(uniqueValidator);

const GetInTouch = mongoose.model("GetInTouch", getInTouchSchema);

module.exports = GetInTouch;
