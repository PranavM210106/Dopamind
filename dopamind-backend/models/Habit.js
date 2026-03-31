const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    habitName: { type: String, required: true },
    frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastCompleted: { type: Date },
    totalCompletions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);