const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const testimonialsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your first name"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
    },
    location: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

testimonialsSchema.plugin(uniqueValidator);

const Testimonials = mongoose.model("Testimonials", testimonialsSchema);

module.exports = Testimonials;
