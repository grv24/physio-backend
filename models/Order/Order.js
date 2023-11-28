const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [],
    address: {
      name: String,
      mobile: Number,
      pincode: Number,
      locality: String,
      address: String,
      city: String,
      state: String,
      landmark: String,
      alternateMobile: Number,
      addressType: String,
    },
    transaction: { type: String, default: "" },
    payment_Status: { type: String, default: "Pending" },
    Bill_Amount: { type: Number },
    Payment_mode: {
      default: "",
      type: String,
      enum: ["", "Cod", "Payonline"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
