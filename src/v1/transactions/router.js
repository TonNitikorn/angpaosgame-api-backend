const express = require('express');
const router = express.Router();
const transactionController = require('./controller');
const limiter = require('../../middleware/rate_limiter');
const passport = require('../../middleware/passport');

router.post('/updateCredits' ,transactionController.updateCredit);
router.post('/createTransaction' ,transactionController.createTransaction);

module.exports = router;