const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const returnPolicySchema = mongoose.Schema({

    returnPolicy: {
        type: String
    },
   
})

returnPolicySchema.plugin(uniqueValidator);

const ReturnPolicy = mongoose.model("ReturnPolicy", returnPolicySchema);

module.exports = ReturnPolicy;