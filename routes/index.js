const express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
const authRouter = require('./auth');

indexRouter.route('/')
.get(async (req, res, next) => {
    return res.render('pages/index');
});

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);

module.exports = indexRouter;
