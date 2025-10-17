import mongoose from "mongoose";

const serviceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  iconUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ServiceCategory", serviceCategorySchema);
