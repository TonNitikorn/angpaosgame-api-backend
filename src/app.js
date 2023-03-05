const express = require('express');
const logger = require('morgan');

const cors = require('cors')

const version1Router = require('./v1/router');

//version 2
const version2Router = require('./v2/router');

// const passport = require('./middleware/passport');
const errorHandler = require('./middleware/error_handler');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//version 2
app.use('/v1', version1Router);
app.use('/v2', version2Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;
