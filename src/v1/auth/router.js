const express = require('express');
const router = express.Router();
const authController = require('./controller');
const limiter = require('../../middleware/rate_limiter');


router.post('/login' , authController.login);


module.exports = router;