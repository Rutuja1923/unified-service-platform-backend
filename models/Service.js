import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true }, // e.g., plumber, maid, electrician
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // provider user ID
    price: Number,
    location: {
      line1: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    availability: [
      {
        day: String, // e.g., Monday
        start: String, // e.g., "09:00"
        end: String, // e.g., "18:00"
      },
    ],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
