import Visitor from "../models/visitor.js";

export const trackVisit = async (req, res) => {
  try {
    const { ip, country, startTime, endTime, pages } = req.body;

    // Find existing visitor or create new one
    let visitor = await Visitor.findOne({ ip });

    if (!visitor) {
      visitor = new Visitor({
        ip,
        country,
        visits: [{ startTime, endTime, pages }],
      });
    } else {
      // Add new visit to existing visitor
      visitor.visits.push({ startTime, endTime, pages });
    }

    await visitor.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Visit tracking error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
