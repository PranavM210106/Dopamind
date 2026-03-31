const Habit = require("../models/Habit");
const User = require("../models/User");
const { recalculateDopamine } = require("../utils/dopamineCalculator");

const getHabits = async (req, res) => {
  const habits = await Habit.find({ userId: req.user._id });
  res.json(habits);
};

const createHabit = async (req, res) => {
  try {
    const { habitName, frequency } = req.body;
    const habit = await Habit.create({ userId: req.user._id, habitName, frequency });
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.user._id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const now = new Date();
    const last = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
    const hoursSinceLast = last ? (now - last) / (1000 * 60 * 60) : 999;

    // Daily habit: allow once per 20 hours
    if (hoursSinceLast < 20) {
      return res.status(400).json({ message: "Already completed recently" });
    }

    // Streak logic: if completed within 28 hours (daily), streak continues
    if (last && hoursSinceLast <= 28) {
      habit.streak += 1;
    } else {
      habit.streak = 1; // reset streak
    }

    habit.longestStreak = Math.max(habit.longestStreak, habit.streak);
    habit.lastCompleted = now;
    habit.totalCompletions += 1;
    await habit.save();

    // Update dopamine score
    const score = await recalculateDopamine(req.user._id);
    await User.findByIdAndUpdate(req.user._id, { dopamineScore: score });

    res.json({ habit, dopamineScore: score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getHabits, createHabit, completeHabit, deleteHabit };