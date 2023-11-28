const asyncHandler = require("express-async-handler");
const fs = require('fs');
const Network = require('../../models/Networks/networksModel');


const createNetworks = async(req,res) => {
    try {
        const { name, location, mobile } = req.body;
        if (!name || !mobile) {
            return res.status(400).json({message: "Please enter Network name and Mobile Number!"})
        } 
        
        let file =req.file ;
        if (file) {
            file = file.path;
        } else {
            file =''
        }
    
        const network = await Network.create({
            name,
            location,
            mobile,
            profilePic: file
        })
      

        if (network) {
            return res.status(201).json({ message: network});
        } else {
            return res.status(400).json({ message: "Somthing Wrong while creating Networks!" });
        }
      
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const getNetworks = async(req,res) => {
    try {
        const networks = await Network.find();
        if (networks.length ==0) {
            return res.status(404).json({ message: "No networks Yet!" });
        }
        return res.status(200).json({ message: networks });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const updateNetworksById = async(req,res) => {
    try {
        const { id } = req.params;
        const { name, location, mobile } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Please Enter a Valid ID." });
        }
        const networks = await Network.findById(id);
        if (!networks) {
            return res.status(404).json({message:"Network not found With This ID."});
        }
        let file = req.file;

        if (name) {
            networks.name = name;
        }
        if (location) {
            networks.location = location;
        }
        if (mobile) {
            networks.mobile = mobile;
        }
       
        if (file) {
            let pic = networks.profilePic;
            if (pic) {
                fs.unlink(pic, (err, pic) => {
                  if (err) return;
                  return;
                });
              }
              networks.profilePic = file.path;
        }
        networks.save();

        return res.status(200).json({ message: networks});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const deleteNetworksById = async(req,res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please Enter a Valid ID." });
        }
        const network = await Network.findOne({ _id: id });
        if (!network) {
            return res.status(400).json({message: "No Network found with this Id."})
        }
        let pic = network.profilePic;
        if (pic) {
            fs.unlink(pic, (err, pic) => {
              if (err) return;
              return;
            });
          }
          network.remove();
            return res.status(200).json({ message: "Network Deleted Successfully." });
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}


module.exports = {
    createNetworks,
    getNetworks,
    updateNetworksById,
    deleteNetworksById
}
