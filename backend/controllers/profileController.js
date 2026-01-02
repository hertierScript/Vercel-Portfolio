import Profile from "../models/profile.js";

// Get profile (public)
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json({ profile: profile || {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update profile (admin only)
export const updateProfile = async (req, res) => {
  try {
    const updateData = req.body;
    const profile = await Profile.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
