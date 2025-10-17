import express from "express";
import Service from "../models/Service.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all services, optional filters: category, city
router.get("/", protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.city) filter["location.city"] = req.query.city;

    const services = await Service.find(filter).populate(
      "provider",
      "name email role"
    );
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single service
router.get("/:id", protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "provider",
      "name email role"
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new service (provider or admin only)
router.post("/", protect, role(["provider", "admin"]), async (req, res) => {
  try {
    const service = new Service({ ...req.body, provider: req.user.id });
    await service.save();
    res.status(201).json({ message: "Service created", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update service (owner provider or admin)
router.post("/:id", protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (
      req.user.role !== "admin" &&
      req.user.id !== service.provider.toString()
    )
      return res.status(403).json({ message: "Forbidden" });

    Object.assign(service, req.body);
    await service.save();
    res.json({ message: "Service updated", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
