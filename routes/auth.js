const express = require('express');
const authRouter = express.Router();

const {
    passport
} = require('../middlewares');

const {
    authController
} = require('../controllers');

/* GET users listing. */

module.exports = authRouter;