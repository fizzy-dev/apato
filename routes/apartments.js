const express = require('express');
const apartmentRouter = express.Router();

const {
  apartmentController
} = require('../controllers');

const {
  checkUserAuthorization
} = require('../middlewares')

apartmentRouter.get('/', apartmentController.renderApartments);
apartmentRouter.get('/new', checkUserAuthorization, apartmentController.renderCreateApartmentForm);
apartmentRouter.get('/:id', apartmentController.renderApartment);

module.exports = apartmentRouter;
