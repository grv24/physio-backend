const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const commingSoonSchema = mongoose.Schema({

    commingSoon: {
        type: String
    },
   

})

commingSoonSchema.plugin(uniqueValidator);

const CommingSoon = mongoose.model("CommingSoon", commingSoonSchema);

module.exports = CommingSoon;