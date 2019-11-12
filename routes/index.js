const express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
const authRouter = require('./auth');
const apiRouter = require('./apis');

indexRouter.route('/')
.get(async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.render('pages/index', { user: req.user });
    }
    return res.render('pages/index');
});

indexRouter.use('/api', apiRouter);
indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);

module.exports = indexRouter;
