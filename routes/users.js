const express = require('express');
const userRouter = express.Router();

const {
  passport
} = require('../middlewares');

const {
  userController
} = require('../controllers');

/* GET users listing. */
userRouter.get('/:id', userController.renderUser);

module.exports = userRouter;
