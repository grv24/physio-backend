const moment = require("moment/moment");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "User",
  },

  issues: [
    {
      issueId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "Issue",
        default: null,
      },
      price: Number,
      qty: Number,
      subscriptionType: [
        {
          category: {
            type: String,
            default:"magazine"
          },
          copyType: String,
        },
      ],
    },
  ],
  annualSubscriptions: {
    annualSubscriptionsId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "AnnualSubscriptions",
      default: null,
    },
    price: Number,
    qty: {type: Number, trim: true, default: 0},
    subscriptionType: [
        {
          category: ["INSTITUTION", "INDIVIDUAL"],
          copyType: String,
        },
      ],
  },
});

cartSchema.plugin(uniqueValidator);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
