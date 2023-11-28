const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const faqsSchema = mongoose.Schema({

    faqs: {
        type: String
    },
   
})

faqsSchema.plugin(uniqueValidator);

const Faqs = mongoose.model("Faqs", faqsSchema);

module.exports = Faqs;