import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  provider: String,
  price: String,
  image: String,
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
