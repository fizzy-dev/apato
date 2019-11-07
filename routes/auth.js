const express = require('express');
const authRouter = express.Router();

const {
    authController
} = require('../controllers')

/* GET users listing. */
authRouter.route('/login')
.get(authController.getLogin);

module.exports = authRouter;