const Disclaimer = require("../../models/footer/disclaimerModel");

const disclaimer = async (req, res) => {
  try {
    const { disclaimer } = req.body;
    if (!disclaimer) {
      return res
        .status(400)
        .json({ message: "Please enter your Disclaimer!" });
    }

    const data = await Disclaimer.create({
        disclaimer,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Disclaimer." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getDisclaimer = async (req, res) => {
  try {
    const data = await Disclaimer.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Disclaimer Field!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateDisclaimer = async (req, res) => {
  try {
    const { id } = req.params;

    const { disclaimer } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!disclaimer) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await Disclaimer.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Disclaimer Data not Found With this ID." });
    }

    if (disclaimer) {
      data.disclaimer = disclaimer;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    disclaimer,
  getDisclaimer,
  updateDisclaimer,
};
