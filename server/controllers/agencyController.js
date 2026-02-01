import User from "../models/User.js";
import Agency from "../models/Agency.js";

export const agencyReg = async (req, res) => {
  try {
    const { name, email, address, contact, city } = req.body;
    const owner = req.user._id;

    const agency = await Agency.findOne({ owner });
    if (agency) {
      return res.json({ success: false, message: "Agency already registered" });
    }

    await Agency.create({
      name,
      email,
      contact,
      city,
      address,
      owner
    });
    await User.findByIdAndUpdate(owner, { role: "agencyOwner" });
    res.json({ success: true, message: "Agency registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
