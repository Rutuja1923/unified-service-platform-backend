import express from "express";
import Booking from "../models/Booking.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all bookings (admin)
router.get("/", protect, role(["admin"]), async (req, res) => {
  const bookings = await Booking.find().populate(
    "userId providerId serviceId organizationId"
  );
  res.json(bookings);
});

// GET my bookings (user/provider)
router.get("/me", protect, async (req, res) => {
  const filter =
    req.user.role === "provider"
      ? { providerId: req.user.id }
      : { userId: req.user.id };
  const bookings = await Booking.find(filter).populate("serviceId");
  res.json(bookings);
});

// POST create booking (user)
router.post("/", protect, role(["user", "organization"]), async (req, res) => {
  const booking = new Booking({
    ...req.body,
    userId: req.user.id,
  });
  await booking.save();
  res.status(201).json({ message: "Booking created", booking });
});

// PUT update status (provider)
router.put("/:id/status", protect, role(["provider"]), async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

export default router;
