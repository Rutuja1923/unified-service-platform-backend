import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Transaction from "../models/Transaction.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: "provider" });
    const activeBookings = await Booking.countDocuments({
      status: { $in: ["pending", "in_progress"] },
    });

    const transactions = await Transaction.find();
    const totalRevenue = transactions.reduce((sum, t) => sum + t.balance, 0);

    res.json({
      totalUsers,
      totalProviders,
      activeBookings,
      totalRevenue,
      lastUpdated: new Date(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
