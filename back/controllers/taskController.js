const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
    try {
        let data = await Task.getAllTasks();
        if (data.length > 0) {
            res.json(data);
        } else {
            throw new Error("No data found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTask = async (req, res) => {
    try {
        let data = await Task.getTaskById(req.params.id);
        if (Object.keys(data).length > 0) {
            res.json({ message: "Task found!", data: data });
        } else {
            throw new Error("No data found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        let newTask = {
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };

        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ error: "Task info is required" });
        }

        let data = await Task.createTask(newTask);
        res.json({ message: "New task created!", data: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        let taskToUpdate = {
            $set: {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
            }
        };

        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ error: "Task info is required" });
        }

        let data = await Task.updateTask(req.params.id, taskToUpdate);
        res.json({ message: "Task updated!", data: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        let data = await Task.deleteTask(req.params.id);
        if (Object.keys(data).length > 0) {
            res.json({ message: "Task deleted!", data: data });
        } else {
            throw new Error("No data found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};