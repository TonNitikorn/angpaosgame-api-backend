const express = require('express');
const router = express.Router();
const membermanageController = require('./controller');
const limiter = require('../../middleware/rate_limiter');
const passport = require('../../middleware/passport');


router.post('/getMemberTransaction' ,membermanageController.getMemberTransaction);
router.post('/getGame' , membermanageController.getGame);
router.post('/getGameChart' , membermanageController.getGameChart);
module.exports = router;