const express = require('express');
const router = express.Router();
const agentController = require('./controller');
const limiter = require('../../middleware/rate_limiter');


router.post('/register' , agentController.register);


module.exports = router;