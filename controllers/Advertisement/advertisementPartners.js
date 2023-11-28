const Advertisement = require("../../models/Advertisement/advertisementPartnersModel");
const fs = require('fs');

const advertisementPartners = async (req, res) => {
  try {
    const { companyName, link } = req.body;


    let file = req.file;

    if (!companyName || !file || !link) {
      return res
        .status(400)
        .json({ message: "Please enter all the required fields!" });
    }

    const data = await Advertisement.create({
      companyName,
      logo: file.path,
      link,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating data." });
    }
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};

const getAdvertisementPartners = async (req, res) => {
  try {
      const data = await Advertisement.find();
      
    if (data.length == 0) {
      return res
        .status(404)
        .json({ message: "No Advertisement Partners Yet!" });
    }
  return  res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const updateAdvertisementPartners = async(req, res) =>{
try {
  const { id } = req.params;
if (!id) {
    return res.status(400).json({ message:'Please enter a valid id!' });
}
  const {companyName,link} = req.body;
  let file =req.file;
  
  if(!companyName && !link && !file){
       return res.status(400).json({message : "No Data Updated!."})
  }
     const data = await Advertisement.findById(id);
      if (!data) {
          return res.status(400).json({ message: 'Data with this ID Not Found!' })
      }

      if(companyName){
        data.companyName =companyName;
      }
      if(link){
        data.link = link;
      }
   
      if(file){
        let logo =data.logo;
        fs.unlink(logo, (err, pic) => {
          if (err) return;
          return;
        });
        data.logo =file.path;
      }
      await data.save();

      return res.status(400).json({message : "Data Updated Successfully!."})
} catch (error) {
  return res.status(400).json({ message: error.message });
}
}

const deleteAdvertisementPartners = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) {
          return res.status(400).json({ message:'Please enter a valid id!' });
      }
      const data = await Advertisement.findById(id);
      if (!data) {
          return res.status(400).json({ message: 'Data with this ID Not Found!' })
      }
      const logo = data.logo;
      if (logo) {
        fs.unlink(logo, (err, pic) => {
          if (err) return;
          return;
        });
      }

      await data.remove();
    return  res.status(200).json({ message: 'Data Deleted Successfully!' });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  advertisementPartners,
  getAdvertisementPartners,
  updateAdvertisementPartners,
  deleteAdvertisementPartners,
};
