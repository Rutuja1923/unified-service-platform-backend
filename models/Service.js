import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: String,
  addedBy: String,
  image: String
});

export default mongoose.model("Service", serviceSchema);
