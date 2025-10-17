import express from "express";
import Transaction from "../models/Transaction.js";
import { protect, role } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get my wallet & transactions
router.get("/my", protect, async (req, res) => {
  try {
    const wallet = await Transaction.findOne({ userId: req.user.id });
    if (!wallet) return res.json({ balance: 0, transactions: [] });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin: View all transactions
router.get("/", protect, role(["admin"]), async (req, res) => {
  try {
    const wallets = await Transaction.find().populate("userId", "name email");
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add transaction (credit/debit)
router.post("/", protect, async (req, res) => {
  try {
    const { type, amount, method, status } = req.body;

    let wallet = await Transaction.findOne({ userId: req.user.id });
    if (!wallet) {
      wallet = new Transaction({
        userId: req.user.id,
        balance: 0,
        transactions: [],
      });
    }

    const newTransaction = {
      transactionId: Date.now().toString(),
      type,
      amount,
      method,
      status,
      createdAt: new Date(),
    };

    wallet.transactions.push(newTransaction);
    wallet.balance += type === "credit" ? amount : -amount;

    await wallet.save();
    res.status(201).json({ message: "Transaction added", wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
