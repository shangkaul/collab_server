const express = require('express');
const wsControllers = require('../Controllers/ws.controllers');
const router = express.Router();

router.get('/getAll', wsControllers.getAll);
router.post('/findWs', wsControllers.findWs);


module.exports = router