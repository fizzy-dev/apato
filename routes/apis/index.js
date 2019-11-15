const express = require('express');
const apiRouter = express.Router();


const {
    apiErrorHandler
} = require('../../middlewares');

const apiUserRouter = require('./users');
const apiApartmentRouter = require('./apartment');

apiRouter.use('/v1/users', apiUserRouter);
apiRouter.use('/v1/apartments', apiApartmentRouter);

apiRouter.use(apiErrorHandler);

module.exports = apiRouter;