const express = require('express');
const taskControllers = require('../Controllers/task.controllers');
const router = express.Router();

router.post('/fetchTask', taskControllers.fetchTask);


module.exports = router