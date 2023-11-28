const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const aboutUsSchema = mongoose.Schema({

    aboutUs: {
        type: String
    },
   

})

aboutUsSchema.plugin(uniqueValidator);

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

module.exports = AboutUs;