const express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
const apartmentRouter = require('./apartments');
const apiRouter = require('./apis');

indexRouter.route('/')
.get(async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.render('pages/index', { currentUser: req.user });
    }
    return res.render('pages/index');
});

indexRouter.use('/api', apiRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/apartments', apartmentRouter);

module.exports = indexRouter;
