import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new service
router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const newService = new Service(req.body);
    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving service:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
