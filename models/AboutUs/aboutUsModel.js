const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const aboutUsSchema = mongoose.Schema({

    aboutUs: {
        type: String
    },
   
})

aboutUsSchema.plugin(uniqueValidator);

const AboutUs = mongoose.model("aboutUs", aboutUsSchema);

module.exports = AboutUs;