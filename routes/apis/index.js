const express = require('express');
const apiRouter = express.Router();


const {
    apiErrorHandler
} = require('../../middlewares');
const apiUserRouter = require('./users');

apiRouter.use('/v1/users', apiUserRouter);

apiRouter.use(apiErrorHandler);

module.exports = apiRouter;