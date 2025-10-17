import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  against: { type: mongoose.Schema.Types.ObjectId },
  description: String,
  status: {
    type: String,
    enum: ["open", "in_review", "resolved"],
    default: "open",
  },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Complaint", complaintSchema);
