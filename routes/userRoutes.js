import express from "express";
import User from "../models/User.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users, optional role filter: /api/users?role=provider
router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role; // e.g., provider, organization, user
    }
    const users = await User.find(filter).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single user by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user info (admin or self)
router.post("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only admin or same user can update
    if (req.user.role !== "admin" && req.user.id !== user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    Object.assign(user, req.body); // merge updates
    await user.save();
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
