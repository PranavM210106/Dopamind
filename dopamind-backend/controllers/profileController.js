const User = require("../models/User");

// @GET /api/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    const { phone, height, weight, profession, status, bio, dob, motivation, profilePhoto } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { phone, height, weight, profession, status, bio, dob, motivation, profilePhoto },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, updateProfile };