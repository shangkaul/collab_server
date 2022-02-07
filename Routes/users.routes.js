const express = require('express');
// const checkAuth = require('../Middleware/checkAuth.middleware');
const userControllers = require('../Controllers/users.controllers');
const router = express.Router();

router.get('/getAll', userControllers.getAll);
router.post('/login', userControllers.login);
router.post('/register', userControllers.register);

module.exports = router