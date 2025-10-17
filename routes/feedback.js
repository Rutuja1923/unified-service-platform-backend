import express from "express";
import Feedback from "../models/Feedback.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add feedback (User only)
router.post("/", protect, role(["user"]), async (req, res) => {
  try {
    const feedback = new Feedback({
      ...req.body,
      userId: req.user.id,
      createdAt: new Date(),
    });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get feedback for a provider (public)
router.get("/provider/:providerId", async (req, res) => {
  try {
    const feedback = await Feedback.find({
      providerId: req.params.providerId,
    }).populate("userId", "name email");
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin: view all feedback
router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const allFeedback = await Feedback.find()
      .populate("userId", "name")
      .populate("providerId", "name");
    res.json(allFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
