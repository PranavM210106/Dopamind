const Task = require("../models/Task");
const Habit = require("../models/Habit");
const User = require("../models/User");

const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({ userId, completed: true });
    const pendingTasks = totalTasks - completedTasks;

    const habits = await Habit.find({ userId });
    const totalHabits = habits.length;
    const totalStreakSum = habits.reduce((s, h) => s + h.streak, 0);
    const avgStreak = totalHabits ? (totalStreakSum / totalHabits).toFixed(1) : 0;

    const user = await User.findById(userId);

    // Last 7 days task completions
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentCompletions = await Task.countDocuments({
      userId,
      completed: true,
      completedAt: { $gte: sevenDaysAgo },
    });

    res.json({
      dopamineScore: user.dopamineScore,
      totalTasks,
      completedTasks,
      pendingTasks,
      totalHabits,
      avgStreak,
      recentCompletions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserAnalytics };