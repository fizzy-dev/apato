const express = require('express');
const userRouter = express.Router();

const {
  checkUserAuthorization
} = require('../middlewares');

const {
  userController,
  apartmentController
} = require('../controllers');

/* GET users listing. */
userRouter.get('/saved', checkUserAuthorization, apartmentController.renderSavedApartments);
userRouter.get('/:id', userController.renderUser);

module.exports = userRouter;
