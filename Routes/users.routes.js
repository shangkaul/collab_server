const express = require('express');
// const checkAuth = require('../Middleware/checkAuth.middleware');
const userControllers = require('../Controllers/users.controllers');
const router = express.Router();

router.get('/getAll', userControllers.getAll);

module.exports = router