const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.post('/tasks', controller.createTask);
router.get('/tasks', controller.getAllTasks);
router.get('/task/:id', controller.getTask);
router.put('/task/:id', controller.updateTask);
router.delete('/task/:id', controller.deleteTask);

module.exports = router;
