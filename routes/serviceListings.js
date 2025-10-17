import express from "express";
import ServiceListing from "../models/ServiceListing.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all services (public)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    const services = await ServiceListing.find(filter)
      .populate("providerId")
      .populate("categoryId");
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create service (provider)
router.post("/", protect, role(["provider"]), async (req, res) => {
  try {
    const newService = new ServiceListing({
      ...req.body,
      providerId: req.user.id,
    });
    await newService.save();
    res.status(201).json({ message: "Service created", newService });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update service (provider)
router.put("/:id", protect, role(["provider"]), async (req, res) => {
  try {
    const updated = await ServiceListing.findOneAndUpdate(
      { _id: req.params.id, providerId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE service (provider)
router.delete("/:id", protect, role(["provider"]), async (req, res) => {
  try {
    await ServiceListing.findOneAndDelete({
      _id: req.params.id,
      providerId: req.user.id,
    });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
