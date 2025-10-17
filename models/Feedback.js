import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProviderProfile",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  photoProof: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
