const createError = require('http-errors');

const {
    Apartment,
    User
} = require('../models');

// APIs
const getApartments = async (req, res, next) => {
    try {
        let {
            limit,
            page,
            keyword
        } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);

        if (isNaN(limit)) {
            limit = 5;
        }
        if (isNaN(page)) {
            page = 1;
        }
        let offset = limit * (page - 1);

        let result = await Apartment.getApartmentsByKeyword(keyword, offset, limit);
        let apartments = result[0];
        let count = result[1][0].count;

        return res.json({
            status: 'success',
            data: {
                apartments,
                count
            }
        });
    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

const createApartment = async (req, res, next) => {
    try {
        let {
            name,
            ownerId,
            location,
            description,
            price,
            picture
        } = req.body;

        let apartment = new Apartment({ name, ownerId, location, description, price, picture });

        await apartment.save();

        return res.json({
            status: 'success',
            msg: 'Create apartment successful'
        });
    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

const makeReviews = async (req, res, next) => {
    try {
        let review = req.body;

        let apartmentId = req.params.id;

        let userId = req.user.id;

        if (!review.ownerId || !review.content) {
            next(createError('400', 'Missing parameters'));
        }

        await Apartment.makeReviews({ ...review, apartmentId, userId });

        return res.json({
            status: 'success',
            msg: 'Make review successful'
        });
    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

// Rendering

const renderApartment = async (req, res, next) => {
    try {
        let {
            id
        } = req.params;

        let apartment = await Apartment.getApartmentById(id);
        if (!apartment[0]) {
            next(createError(404, 'Not found'));
        }

        let owner = await User.getUserById(apartment[0].ownerId);
        if (!owner[0]) {
            next(createError(404, 'Not found'));
        }

        let reviews = await Apartment.getReviews(apartment[0].id);
        console.log(reviews);

        if (req.isAuthenticated()) {
            let check = await User.checkSavedApartment(req.user.id, id);
            console.log(check);
            let saved;
            if (!check[0]) {
                saved = 0;
            } else {
                saved = check[0].saved;
            }
            return res.render('pages/apartment', { currentUser: req.user, apartment: apartment[0], owner: owner[0], reviews, saved });
        }
        return res.render('pages/apartment', { apartment: apartment[0], owner: owner[0], reviews });
    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

const renderApartments = async (req, res, next) => {
    try {
        let {
            keyword,
            limit,
            page
        } = req.query;

        if (req.isAuthenticated()) {
            return res.render('pages/apartments', { currentUser: req.user, keyword, limit, page });
        }
        return res.render('pages/apartments', { keyword, limit, page });
    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

const renderCreateApartmentForm = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return res.render('pages/newApartment', { currentUser: req.user });
        }
        return res.render('pages/newApartment');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getApartments,
    createApartment,
    makeReviews,
    renderApartments,
    renderApartment,
    renderCreateApartmentForm
}