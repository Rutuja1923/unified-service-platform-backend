import express from "express";
import OrganizationProfile from "../models/OrganizationProfile.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all organizations (admin)
router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const orgs = await OrganizationProfile.find().populate(
      "userId",
      "name email"
    );
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my organization profile
router.get("/me", protect, role(["organization"]), async (req, res) => {
  try {
    const org = await OrganizationProfile.findOne({ userId: req.user.id });
    res.json(org);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST/PUT create or update organization profile
router.post("/", protect, role(["organization"]), async (req, res) => {
  try {
    const existing = await OrganizationProfile.findOne({ userId: req.user.id });
    if (existing) {
      const updated = await OrganizationProfile.findOneAndUpdate(
        { userId: req.user.id },
        req.body,
        { new: true }
      );
      return res.json({ message: "Profile updated", updated });
    }

    const newProfile = new OrganizationProfile({
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
