const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const advertisementTypeSchema = mongoose.Schema(
    {

        advertisementType: {
           type:String,
           
        },
         
    },
    {
        timestamps: true  
    }
)

advertisementTypeSchema.plugin(uniqueValidator);

const AdvertisementType = mongoose.model("AdvertisementType", advertisementTypeSchema);

module.exports = AdvertisementType;