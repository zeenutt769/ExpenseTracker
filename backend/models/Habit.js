const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: String,
  title: String,
  emoji: String,
  days: { type: [Boolean], default: Array(30).fill(false) }
});

module.exports = mongoose.model("Habit", HabitSchema);
