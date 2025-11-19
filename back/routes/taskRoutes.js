const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.route("/tasks").get(controller.getAllTasks);
router.route("/tasks/:id").get(controller.getTask);
router.route("/tasks").post(controller.createTask);
router.route("/tasks/:id").put(controller.updateTask);
router.route("/tasks/:id").delete(controller.deleteTask);

module.exports = router;