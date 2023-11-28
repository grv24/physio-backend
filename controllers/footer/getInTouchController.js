const GetInTouch = require("../../models/footer/getInTouchModel");

const getInTouch = async (req, res) => {
  try {
    const { mobile, email, companyName, address } = req.body;

    if (!mobile || !email) {
      return res
        .status(400)
        .json({ message: "Please enter Email and Mobile Number!" });
    }

    const data = await GetInTouch.create({
        mobile,
        email,
        companyName,
        address
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Get In Touch Fields!." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getGetInTouch = async (req, res) => {
  try {
    const data = await GetInTouch.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Privacy Policy!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateGetInTouch = async (req, res) => {
  try {
    const { id } = req.params;

    const { mobile, email, companyName, address} = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!mobile && !email && !companyName && !address) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await GetInTouch.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Get In touch Data not Found With this ID." });
    }

    if (mobile) {
      data.mobile = mobile;
      }
      if (email) {
          data.email = email;
      }
      if (companyName) { 
          data.companyName = companyName;
      }
      if (address) {
          data.address = address;
      }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getInTouch,
  getGetInTouch,
  updateGetInTouch,
};
