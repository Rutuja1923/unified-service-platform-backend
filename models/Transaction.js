import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      transactionId: String,
      type: { type: String, enum: ["credit", "debit"], required: true },
      amount: Number,
      method: String,
      status: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Transaction", transactionSchema);
