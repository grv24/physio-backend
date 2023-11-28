const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const buyIssueSchema = mongoose.Schema(
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

    price: {
      type: Number,
    },

    issueType: {
      type: String,
      required: [true, "Please Define Your Subscription Type"],
    },
  },
  {
    timestamps: true,
  }
);

buyIssueSchema.plugin(uniqueValidator);

const BuyIssue = mongoose.model("BuyIssue", buyIssueSchema);

module.exports = BuyIssue;
