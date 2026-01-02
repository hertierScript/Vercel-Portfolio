import Forex from "../models/forex.js";

// Get all forex studies (public)
export const getForex = async (req, res) => {
  try {
    const forex = await Forex.find();
    res.status(200).json(forex);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create forex study (admin only)
export const createForex = async (req, res) => {
  try {
    const { title, description, thumbnail, week } = req.body;

    const newForex = await Forex.create({
      title,
      description,
      thumbnail,
      week,
    });

    res.status(201).json(newForex);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update forex study (admin only)
export const updateForex = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedForex = await Forex.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedForex) {
      return res.status(404).json({ message: "Forex study not found." });
    }

    res.status(200).json(updatedForex);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete forex study (admin only)
export const deleteForex = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForex = await Forex.findByIdAndDelete(id);

    if (!deletedForex) {
      return res.status(404).json({ message: "Forex study not found." });
    }

    res.status(200).json({ message: "Forex study deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
