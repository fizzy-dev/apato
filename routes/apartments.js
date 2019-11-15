const express = require('express');
const apartmentRouter = express.Router();

const {
  apartmentController
} = require('../controllers');

apartmentRouter.get('/', apartmentController.renderApartments);
apartmentRouter.get('/:id', apartmentController.renderApartment);

module.exports = apartmentRouter;
