import mongoose from "mongoose";

const organizationProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  organizationName: { type: String, required: true },
  registrationId: String,
  industryType: String,
  address: {
    city: String,
    state: String,
  },
  bulkRequestHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  ],
  verifiedByAdmin: { type: Boolean, default: false },
});

export default mongoose.model("OrganizationProfile", organizationProfileSchema);
