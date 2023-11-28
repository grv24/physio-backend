const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const shippingPolicySchema = mongoose.Schema({

    shippingPolicy: {
        type: String
    },
   
})

shippingPolicySchema.plugin(uniqueValidator);

const ShippingPolicy = mongoose.model("ShippingPolicy", shippingPolicySchema);

module.exports = ShippingPolicy;