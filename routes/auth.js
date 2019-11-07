const express = require('express');
const authRouter = express.Router();

const {
    passport
} = require('../middlewares');

const {
    authController
} = require('../controllers');

/* GET users listing. */
authRouter.route('/login')
.post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = authRouter;