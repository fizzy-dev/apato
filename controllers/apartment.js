const createError = require('http-errors');

const {
    Apartment
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

const getApartment = async (req, res, next) => {
    try {

    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

const createApartment = async (req, res, next) => {
    try {
        let {
            name,
            ownerId,
            location
        } = req.body;

        let apartment = new Apartment({ name, ownerId, location });

        await apartment.save();

        return res.json({
            status: 'success',
            msg: 'Create apartment successful'
        });
    } catch (e) {
        next(createError(500, 'Unexpected error'));
    }
}

// Rendering

const renderApartment = async (req, res, next) => {
    try {

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

module.exports = {
    getApartments,
    createApartment,
    renderApartments,
    renderApartment
}