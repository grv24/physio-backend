const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const advertisementFooterPosterSchema = mongoose.Schema(
    {

        advertisementFooterPoster: {
           type:String,
           
        },
         
    },
    {
        timestamps: true  
    }
)

advertisementFooterPosterSchema.plugin(uniqueValidator);

const AdvertisementFooterPoster = mongoose.model("AdvertisementFooterPoster", advertisementFooterPosterSchema);

module.exports = AdvertisementFooterPoster;