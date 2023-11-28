const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const subscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    currentDate: {
      type: String,
      required: [true, "Please enter a valid date"],
    },

    expiryDate: {
      type: String,
    },

    status: {
      type: String,
      default: "active",
    },

    subscriptionType: {
      type: String,
      required: [true, "Please Define Your Subscription Type"],
    },

    subscriptionCategory: {
      type: String,
      required: [true, "Please Define Your Subscription Category"],
    },

    price: {
      type: Number,
    },
    
    qty:{
      type:Number,
      default:1
    }
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.plugin(uniqueValidator);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
