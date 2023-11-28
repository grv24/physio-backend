const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const contestBodyDataSchema = mongoose.Schema({

    bodyData: {
        type: String
    },
   
})

contestBodyDataSchema.plugin(uniqueValidator);

const ContestBodyData = mongoose.model("ContestBodyData", contestBodyDataSchema);

module.exports = ContestBodyData;