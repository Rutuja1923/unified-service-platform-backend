import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceCategoryRoutes from "./routes/serviceCategories.js";
import providerProfileRoutes from "./routes/providerProfiles.js";
import organizationProfileRoutes from "./routes/organizationProfiles.js";
import serviceListingRoutes from "./routes/serviceListings.js";
import bookingRoutes from "./routes/bookings.js";
import feedbackRoutes from "./routes/feedback.js";
import complaintRoutes from "./routes/complaints.js";
import transactionRoutes from "./routes/transactions.js";
import adminAnalyticsRoutes from "./routes/analytics.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/categories", serviceCategoryRoutes);
app.use("/api/providers", providerProfileRoutes);
app.use("/api/organizations", organizationProfileRoutes);
app.use("/api/listing", serviceListingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
