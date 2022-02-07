const express = require('express');
const taskControllers = require('../Controllers/task.controllers');
const router = express.Router();

router.post('/fetchTask', taskControllers.fetchTask);
router.post('/addTask', taskControllers.addTask);
router.post('/delTask', taskControllers.delTask);

module.exports = router