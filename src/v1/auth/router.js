const express = require('express');
const router = express.Router();
const authController = require('./controller');
const limiter = require('../../middleware/rate_limiter');


router.post('/login' , authController.login);
router.post('/loginGame' , authController.loginGame);
router.post('/loginGame3x3' , authController.loginGame3x3);

module.exports = router;
