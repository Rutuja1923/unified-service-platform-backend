import express from "express";
import Complaint from "../models/Complaint.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Raise complaint (User or Provider)
router.post("/", protect, role(["user", "provider"]), async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      raisedBy: req.user.id,
      status: "open",
      createdAt: new Date(),
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ View own complaints
router.get("/my", protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ raisedBy: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin: View all complaints
router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("raisedBy", "name role")
      .populate("resolvedBy", "name role");
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin: Update status (resolve complaint)
router.put("/:id/status", protect, role(["admin"]), async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = req.body.status || complaint.status;
    complaint.resolvedBy = req.user.id;
    complaint.updatedAt = new Date();
    await complaint.save();

    res.json({ message: "Complaint updated", complaint });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
