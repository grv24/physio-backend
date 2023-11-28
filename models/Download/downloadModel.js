const mongoose = require("mongoose");


const downloadSchema = mongoose.Schema(
    {
        bookname: {
            type: String,
            required: [true, "Uploaded file must have a name"],
        },
       
        coverImg: {
           type:String,
           
        },
         pdffile: {
             type: String

           },
    },
    {
        timestamps: true  
    }
)


const Downloads = mongoose.model("Download", downloadSchema);

module.exports = Downloads;