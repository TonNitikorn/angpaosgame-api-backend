const express = require('express');
const router = express.Router();
const gameController = require('./controller');
const limiter = require('../../middleware/rate_limiter');
const passport = require('../../middleware/passport');

// router.post('/gameMatrix' ,gameController.gameMatrix);
router.post('/createGame', gameController.createGamesImgUrl);
router.get('/getGameList', gameController.getGameList);

module.exports = router;