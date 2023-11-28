const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const privacyPolicySchema = mongoose.Schema({

    privacyPolicy: {
        type: String
    },
   
})

privacyPolicySchema.plugin(uniqueValidator);

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);

module.exports = PrivacyPolicy;