var mongoose = require("mongoose");
var crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const baseOptions = {
  discriminatorKey: "__type",
  collection: "administrations",
  timestamps: true,
};

const BaseUserSchema = new mongoose.Schema(
  {
    PersonalDetails: {
      prefix:{
        type: String,
        maxlenght: 32,
        trim: true,
      },
      userName: {
        type: String,
        maxlenght: 32,
      },
      emailId: {
        type: String,
        unique: true,
        required: true,
      },
      salt: {
        type: String,
      },
      role: {
        type: Number,
        default: 0,
      },
      encry_password: {
        type: String,
      },
    },
    UplineId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "BaseUserSchema",
      default: null,
    },
    isAccountDisabled: {
      type: Boolean,
      default: false,
    },
    Journals:[
      {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "journals",
        default: null,
      }
    ]
  },
  baseOptions
);

BaseUserSchema.virtual("PersonalDetails.password")
  .set(function (password) {
    this._password = password;
    this.PersonalDetails.salt = uuidv1();
    this.PersonalDetails.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

BaseUserSchema.methods = {
  authenticate: function (plainPassword) {
    return (
      this.securePassword(plainPassword) === this.PersonalDetails.encry_password
    );
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.PersonalDetails.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return console.log(error);
    }
  },
};

module.exports.BaseUser = mongoose.model("BaseUserSchema", BaseUserSchema);
