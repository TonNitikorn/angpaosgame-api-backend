const express = require('express');
const router = express.Router();


const authRouter = require('./auth/router');
const adminRouter = require('./admins/router');
const agentRouter = require('./agents/router');


//create router prefix /v1
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/agent', agentRouter);




module.exports = router;