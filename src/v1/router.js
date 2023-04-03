const express = require('express');
const router = express.Router();


const authRouter = require('./auth/router');
const adminRouter = require('./admins/router');
const agentRouter = require('./agents/router');
const gameRouter = require('./games/router');
const member = require('./members/router');


//create router prefix /v1
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/agent', agentRouter);
router.use('/game', gameRouter);
router.use('/member', member);





module.exports = router;