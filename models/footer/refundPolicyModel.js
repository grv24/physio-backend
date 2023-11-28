const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const refundPolicySchema = mongoose.Schema({

    refundPolicy: {
        type: String
    },
   
})

refundPolicySchema.plugin(uniqueValidator);

const RefundPolicy = mongoose.model("RefundPolicy", refundPolicySchema);

module.exports = RefundPolicy;