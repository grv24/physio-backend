const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Team = require("../../models/Team/teamModel");

const createTeamMember = async (req, res) => {
  try {
    const { name, designation } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please enter team member name!" });
    }

    let file = "";
    if (req.file) {
      file = req.file.path;
    }

    const teamMember = await Team.create({
      name,
      designation,
      profilePic: file,
    });

    if (teamMember) {
      return res.status(201).json({ message: teamMember });
    } else {
      return res
        .status(400)
        .json({ message: "Somthing Wrong while creating team member!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getTeamMember = async (req, res) => {
  try {
    const team = await Team.find();
    if (team.length == 0) {
      return res.status(404).json({ message: "No team members Yet!" });
    }
    return res.status(200).json({ message: team });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    const teamMember = await Team.findById(id);
    if (!teamMember) {
      return res
        .status(404)
        .json({ message: "Team members not found With This ID." });
    }
    let file = req.file;

    if (name) {
      teamMember.name = name;
    }

    if (designation) {
      teamMember.designation = designation;
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
const deleteTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    const teamMember = await Team.findOne({ _id: id });
    if (!teamMember) {
      return res
        .status(400)
        .json({ message: "No Team member found with this Id." });
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
      .json({ message: "Team member account Deleted Successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTeamMember,
  getTeamMember,
  updateTeamMemberById,
  deleteTeamMemberById,
};
