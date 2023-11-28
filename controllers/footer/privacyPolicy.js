const PrivacyPolicy = require("../../models/footer/privacyPolicyModel");

const privacyPolicy = async (req, res) => {
  try {
    const { privacyPolicy } = req.body;

    
    if (!privacyPolicy) { 
      return res
        .status(400)
        .json({ message: "Please enter your Privacy Policy!" });
    }

    const data = await PrivacyPolicy.create({
      privacyPolicy,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Privacy Policy." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getPrivacyPolicy = async (req, res) => {
  try {
    const data = await PrivacyPolicy.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Privacy Policy!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updatePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const { privacyPolicy } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!privacyPolicy) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await PrivacyPolicy.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Privacy Policy Data not Found With this ID." });
    }

    if (privacyPolicy) {
      data.privacyPolicy = privacyPolicy;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  privacyPolicy,
  getPrivacyPolicy,
  updatePrivacyPolicy,
};
