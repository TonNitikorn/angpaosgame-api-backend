const express = require('express');
const router = express.Router();
const gameController = require('./controller');
const limiter = require('../../middleware/rate_limiter');


router.post('/register' , gameController.register);


module.exports = router;