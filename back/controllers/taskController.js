const Task = require("../models/taskModel");

const sendServerError = (res, err) =>
  res.status(500).json({ error: err.message || "Server error" });

exports.createTask = async (req, res) => {
  
  let newTask = {
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  try {
    if (!req.body.title || !req.body.description)
      return res.status(400).json({ error: "Task info is required" });

    const result = await Task.createTask(newTask);
    return res.status(201).json({ id: result.insertedId, ...newTask });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();
    return res.json(tasks);
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params.id;
    const task = await Task.getTaskById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.json(task);
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.updateTask = async (req, res) => {
  let taskToUpdate = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    },
  };
  try {
    const { id } = req.params.id;
    const update = taskToUpdate;
    if (!update)
      return res.status(400).json({ error: "Update payload required" });

    const result = await Task.updateTask(id, update);

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Task not found" });
    return res.json({ message: "Task updated", update });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params.id;
    const result = await Task.deleteTask(id);
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Task not found" });
    return res.json({ message: "Task deleted" });
  } catch (err) {
    return sendServerError(res, err);
  }
};
