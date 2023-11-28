const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const disclaimerSchema = mongoose.Schema({

    disclaimer: {
        type: String
    },
   
})

disclaimerSchema.plugin(uniqueValidator);

const Disclaimer = mongoose.model("Disclaimer", disclaimerSchema);

module.exports = Disclaimer;