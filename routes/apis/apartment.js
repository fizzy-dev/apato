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

apiApartmentRouter.route('/:id/reviews')
.post(apartmentController.makeReviews);

module.exports = apiApartmentRouter;