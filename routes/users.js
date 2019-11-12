const express = require('express');
const userRouter = express.Router();

const {
  passport
} = require('../middlewares');

const {
  userController
} = require('../controllers');

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = userRouter;
