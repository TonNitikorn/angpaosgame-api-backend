const express = require('express');
const router = express.Router();
const adminController = require('./controller');
const limiter = require('../../middleware/rate_limiter');


router.post('/register' , adminController.register);


module.exports = router;