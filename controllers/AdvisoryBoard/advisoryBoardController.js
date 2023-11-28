const asyncHandler = require("express-async-handler");
const fs = require("fs");
const AdvisoryBoard = require('../../models/AdvisoryBoard/advisoryBoardModel');

const createAdvisoryBoardMember = async (req, res) => {
  try {
    const { name, designation, contribution1,contribution2,location } = req.body;
    if (!name || !designation) {
      return res
        .status(400)
        .json({ message: "Please enter advisory board member name and designation!" });
    }

    let file = "";
    if (req.file) {
      file = req.file.path;
    }

    const teamMember = await AdvisoryBoard.create({
      name,
      profilePic: file,
      designation,
      contribution1,
      contribution2,
      location,
    });

    if (teamMember) {
      return res.status(201).json({ message: teamMember });
    } else {
      return res
        .status(400)
        .json({ message: "Somthing Wrong while creating advisory board member!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAdvisoryBoardMember = async (req, res) => {
  try {
    const team = await AdvisoryBoard.find();
    if (team.length == 0) {
      return res.status(404).json({ message: "No Advisory Board members Yet!" });
    }
    return res.status(200).json({ message: team });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const  getAdvisoryBoardMemberById = async(req,res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    const teamMember = await AdvisoryBoard.findById(id);
    if (!teamMember) {
      return res
       .status(404)
       .json({ message: "Advisory board members not found With This ID." });
    }
    return res.status(200).json({ message: teamMember });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
const updateAdvisoryBoardMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, contribution1,contribution2,location } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    const teamMember = await AdvisoryBoard.findById(id);
    if (!teamMember) {
      return res
        .status(404)
        .json({ message: "Advisory board members not found With This ID." });
    }
    let file = req.file;

    if (name) {
      teamMember.name = name;
    }

    if (designation) {
      teamMember.designation = designation;
    }
     if (contribution1) {
       teamMember.contribution1 = contribution1;
     }
    if (contribution2) {
      teamMember.contribution2 = contribution2;
    }
    if (location) {
      teamMember.location = location;
    }
    if (file) {
      let pic = teamMember.profilePic;
      if (pic) {
        fs.unlink(pic, (err, pic) => {
          if (err) return;
          return;
        });
      }
      teamMember.profilePic = file.path;
    }
    teamMember.save();

    return res.status(200).json({ message: teamMember });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteAdvisoryBoardMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    const teamMember = await AdvisoryBoard.findOne({ _id: id });
    if (!teamMember) {
      return res
        .status(400)
        .json({ message: "No Advisory board member found with this Id." });
    }
    let pic = teamMember.profilePic;
    if (pic) {
      fs.unlink(pic, (err, pic) => {
        if (err) return;
        return;
      });
    }
    teamMember.remove();
    return res
      .status(200)
      .json({ message: "Advisory board member account Deleted Successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAdvisoryBoardMember,
  getAdvisoryBoardMember,
  getAdvisoryBoardMemberById,
  updateAdvisoryBoardMemberById,
  deleteAdvisoryBoardMemberById,
};
