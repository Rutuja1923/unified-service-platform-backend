import mongoose from "mongoose";

const serviceProviderProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  serviceCategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCategory" },
  ],
  experienceYears: Number,
  hourlyRate: Number,
  workingRadiusKm: Number,
  bio: String,
  availability: {
    days: [String],
    timeSlots: [String],
  },
  documents: {
    idProof: String,
    addressProof: String,
  },
  ratings: {
    average: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  isActive: { type: Boolean, default: true },
  verifiedByAdmin: { type: Boolean, default: false },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model(
  "ServiceProviderProfile",
  serviceProviderProfileSchema
);
