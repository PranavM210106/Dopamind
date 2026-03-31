const Task = require("../models/Task");
const Habit = require("../models/Habit");

const recalculateDopamine = async (userId) => {
  const completedTasks = await Task.countDocuments({ userId, completed: true });
  const habits = await Habit.find({ userId });

  const habitStreakTotal = habits.reduce((sum, h) => sum + h.streak, 0);
  const totalHabitCompletions = habits.reduce((sum, h) => sum + h.totalCompletions, 0);

  const score =
    completedTasks * 10 +
    habitStreakTotal * 5 +
    totalHabitCompletions * 2;

  return score;
};

module.exports = { recalculateDopamine };