const express = require('express');
const router = express.Router();
const gameController = require('./controller');
const limiter = require('../../middleware/rate_limiter');
const passport = require('../../middleware/passport');


router.post('/register' , gameController.register);
router.post('/gameMatrix' ,gameController.gameMatrix);


module.exports = router;