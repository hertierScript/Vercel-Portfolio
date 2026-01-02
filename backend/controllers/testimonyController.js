import Testimony from "../models/testimony.js";

// Get all testimonials (public)
export const getTestimonials = async (req, res) => {
  try {
    const testimonies = await Testimony.find();
    res.status(200).json(testimonies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create testimony (admin only)
export const createTestimony = async (req, res) => {
  try {
    const { fullname, role, testimony } = req.body;

    const newTestimony = await Testimony.create({
      fullname,
      role,
      testimony,
    });

    res.status(201).json(newTestimony);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update testimony (admin only)
export const updateTestimony = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, role, testimony } = req.body;

    const updatedTestimony = await Testimony.findByIdAndUpdate(
      id,
      { fullname, role, testimony },
      { new: true }
    );

    if (!updatedTestimony) {
      return res.status(404).json({ message: "Testimony not found." });
    }

    res.status(200).json(updatedTestimony);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete testimony (admin only)
export const deleteTestimony = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimony = await Testimony.findByIdAndDelete(id);

    if (!deletedTestimony) {
      return res.status(404).json({ message: "Testimony not found." });
    }

    res.status(200).json({ message: "Testimony deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
