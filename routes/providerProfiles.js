import express from "express";
import ProviderProfile from "../models/ProviderProfile.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all provider profiles (admin)
router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const profiles = await ProviderProfile.find().populate(
      "userId",
      "name email"
    );
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my provider profile (provider)
router.get("/me", protect, role(["provider"]), async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST/PUT create or update provider profile (provider)
router.post("/", protect, role(["provider"]), async (req, res) => {
  try {
    const existing = await ProviderProfile.findOne({ userId: req.user.id });
    if (existing) {
      const updated = await ProviderProfile.findOneAndUpdate(
        { userId: req.user.id },
        req.body,
        { new: true }
      );
      return res.json({ message: "Profile updated", updated });
    }

    const newProfile = new ProviderProfile({
      ...req.body,
      userId: req.user.id,
    });
    await newProfile.save();
    res.status(201).json({ message: "Profile created", newProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
