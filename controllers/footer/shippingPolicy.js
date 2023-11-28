const ShippingPolicy = require("../../models/footer/shippingPolicyModel");

const shippingPolicy = async (req, res) => {
  try {
      const { shippingPolicy } = req.body;
      
    if (!shippingPolicy) {
      return res
        .status(400)
        .json({ message: "Please enter your Shipping Policy!" });
    }

    const data = await ShippingPolicy.create({
      shippingPolicy,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Shipping Policy!." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getShippingPolicy = async (req, res) => {
  try {
    const data = await ShippingPolicy.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Shipping Policy!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateShippingPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const { shippingPolicy } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!shippingPolicy) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await ShippingPolicy.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Shipping Policy Data not Found With this ID." });
    }

    if (shippingPolicy) {
      data.shippingPolicy = shippingPolicy;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  shippingPolicy,
  getShippingPolicy,
  updateShippingPolicy,
};
