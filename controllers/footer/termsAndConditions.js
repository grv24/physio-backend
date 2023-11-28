const TermsAndConditions = require("../../models/footer/termsAndConditions");

const termsAndConditions = async (req, res) => {
  try {
    const { termsAndConditions } = req.body;

    if (!termsAndConditions) {
      return res
        .status(400)
        .json({ message: "Please enter your Terms And Conditions!" });
    }

    const data = await TermsAndConditions.create({
        termsAndConditions,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Terms And Conditions!." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getTermsAndConditions = async (req, res) => {
  try {
    const data = await TermsAndConditions.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Terms And Conditions!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.params;

    const { termsAndConditions } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!termsAndConditions) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await TermsAndConditions.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Terms And Conditions not Found With this ID." });
    }

    if (termsAndConditions) {
      data.termsAndConditions = termsAndConditions;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    termsAndConditions,
  getTermsAndConditions,
  updateTermsAndConditions,
};
