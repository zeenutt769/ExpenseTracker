const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: String,
  name: String,
  amount: Number,
  category: String,
  payment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
