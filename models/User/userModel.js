const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please Enter Your first name"],
    },
    lname: {
      type: String,
      required: [true, "Please Enter Your last name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    mobile: {
      type: Number,
      required: [true, "Please Enter your UserName"],
      unique: true,
    },
    role: {
      type: String,
      default: "User"
    },
  
    password: {
      type: String,
      required: [true, "Please Enter your password"],
    },
    status: {
      type: String,
      default: "INACTIVE"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
   
    profilePic: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
