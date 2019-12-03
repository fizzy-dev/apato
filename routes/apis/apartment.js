const express = require('express');
const apiApartmentRouter = express.Router();

const {
    preCreateApartment,
    upload
} = require('../../middlewares');
const {
    apartmentController
} = require('../../controllers');

apiApartmentRouter.route('/')
.get(apartmentController.getApartments)
.post(upload.single('picture'), preCreateApartment, apartmentController.createApartment);

module.exports = apiApartmentRouter;