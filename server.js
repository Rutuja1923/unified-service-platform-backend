import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import servicesRouter from "./routes/services.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
}));
app.use(express.json());
app.use("/api/services", servicesRouter);

mongoose.connect("mongodb://127.0.0.1:27017/servicelink", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.listen(5000, () => console.log("Server running on port 5000"));
