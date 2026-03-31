const Task = require("../models/Task");
const User = require("../models/User");
const { recalculateDopamine } = require("../utils/dopamineCalculator");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline } = req.body;
    const task = await Task.create({ userId: req.user._id, title, description, priority, deadline });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    await task.save();

    // Recalculate dopamine if task completed
    if (req.body.completed === true) {
      task.completedAt = new Date();
      await task.save();
      const score = await recalculateDopamine(req.user._id);
      await User.findByIdAndUpdate(req.user._id, { dopamineScore: score });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };