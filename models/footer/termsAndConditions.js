const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const termsAndConditionsSchema = mongoose.Schema({

    termsAndConditions: {
        type: String
    },
   
})

termsAndConditionsSchema.plugin(uniqueValidator);

const TermsAndConditions = mongoose.model("TermsAndConditions", termsAndConditionsSchema);

module.exports = TermsAndConditions;