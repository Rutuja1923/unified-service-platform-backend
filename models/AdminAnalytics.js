import mongoose from "mongoose";

const adminAnalyticsSchema = new mongoose.Schema({
  totalUsers: Number,
  totalProviders: Number,
  activeBookings: Number,
  totalRevenue: Number,
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("AdminAnalytics", adminAnalyticsSchema);
