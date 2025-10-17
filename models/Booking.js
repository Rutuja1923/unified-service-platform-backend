import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProviderProfile",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceListing",
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrganizationProfile",
  },
  bookingDate: { type: Date, default: Date.now },
  scheduledTime: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "wallet", "online"],
    default: "cash",
  },
  totalAmount: Number,
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  feedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
