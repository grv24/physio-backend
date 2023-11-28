const AwsomeFact = require("../../models/HomePage/awsomefactsModel");

const awsomeFactText = async (req, res) => {
  try {
    const { readers, citiesInIndia,facebookFans,expertAuthors } = req.body;
    if ( !citiesInIndia || !expertAuthors) {
      return res
        .status(400)
        .json({ message: "Please enter required fields!" });
    }

    const data = await AwsomeFact.create({
        readers,
        citiesInIndia,
        facebookFans,
        expertAuthors
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

const getAwsomeFactText = async (req, res) => {
  try {
    const data = await AwsomeFact.find();
    if (data.length ==0) {
      return res.status(400).json({ message: "No data in Header Field!" });
    }
   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

const updateAwsomeFactText = async (req, res) => {
  try {
    const {  readers, citiesInIndia,facebookFans,expertAuthors } = req.body;
    if ( !readers && !citiesInIndia && !facebookFans&& !expertAuthors) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await AwsomeFact.findOne();

    if (readers) {
        data.readers = readers;
      }
  
      if (citiesInIndia) {
        data.citiesInIndia = citiesInIndia;
      }
  
      if (facebookFans) {
        data.facebookFans = facebookFans;
      }
  
      if (expertAuthors) {
        data.expertAuthors = expertAuthors;
      }
    
    await data.save();

   return res.status(200).json({ message: data });
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  awsomeFactText,
  getAwsomeFactText,
  updateAwsomeFactText,
};
