const express = require('express');
const apiApartmentRouter = express.Router();

const {
    apartmentController
} = require('../../controllers');

apiApartmentRouter.route('/')
.get(apartmentController.getApartments)
.post(apartmentController.createApartment);

module.exports = apiApartmentRouter;