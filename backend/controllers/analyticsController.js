import Visitor from "../models/visitor.js";

export const getTotalVisitors = async (req, res) => {
  try {
    const total = await Visitor.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAverageTime = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    let totalTime = 0;
    let visitCount = 0;

    visitors.forEach((visitor) => {
      visitor.visits.forEach((visit) => {
        if (visit.endTime) {
          totalTime += new Date(visit.endTime) - new Date(visit.startTime);
          visitCount++;
        }
      });
    });

    const averageTime = visitCount > 0 ? totalTime / visitCount / 1000 : 0; // in seconds
    res.json({ averageTime });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getActiveViewers = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const active = await Visitor.countDocuments({
      "visits.startTime": { $gte: fiveMinutesAgo },
    });
    res.json({ active });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getNewViewers = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newViewers = await Visitor.countDocuments({
      createdAt: { $gte: today },
    });
    res.json({ newViewers });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTrafficOverview = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const visitors = await Visitor.find({ createdAt: { $gte: sevenDaysAgo } });
    const trafficMap = {};

    visitors.forEach((visitor) => {
      visitor.visits.forEach((visit) => {
        const date = visit.startTime.toISOString().split("T")[0];
        trafficMap[date] = (trafficMap[date] || 0) + 1;
      });
    });

    const traffic = Object.entries(trafficMap).map(([date, visits]) => ({
      date,
      visits,
    }));

    res.json({ traffic });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTopLocations = async (req, res) => {
  try {
    const locations = await Visitor.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.json({ locations });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const resetAnalytics = async (req, res) => {
  try {
    await Visitor.deleteMany({});
    res.json({ message: "Analytics reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
