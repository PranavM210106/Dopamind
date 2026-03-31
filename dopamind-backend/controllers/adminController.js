const User = require("../models/User");
const Task = require("../models/Task");
const Habit = require("../models/Habit");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

const blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.isBlocked = true;
  await user.save();
  res.json({ message: "User blocked" });
};

const unblockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.isBlocked = false;
  await user.save();
  res.json({ message: "User unblocked" });
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Task.deleteMany({ userId: req.params.id });
  await Habit.deleteMany({ userId: req.params.id });
  res.json({ message: "User and all data deleted" });
};

const getGlobalStats = async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const blockedUsers = await User.countDocuments({ isBlocked: true });
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ completed: true });
  const totalHabits = await Habit.countDocuments();

  const scoreAgg = await User.aggregate([
    { $match: { role: "user" } },
    { $group: { _id: null, avgScore: { $avg: "$dopamineScore" } } },
  ]);
  const avgDopamineScore = scoreAgg[0]?.avgScore?.toFixed(1) || 0;

  res.json({ totalUsers, blockedUsers, totalTasks, completedTasks, totalHabits, avgDopamineScore });
};

module.exports = { getAllUsers, blockUser, unblockUser, deleteUser, getGlobalStats };