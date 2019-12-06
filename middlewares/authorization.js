const createError = require('http-errors');

const checkUserAuthorization = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(createError(401, 'Unauthorized'));
    }
}

const checkAdminAuthorization = async (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next();
    } else {
        next(createError(401, 'Unauthorized'));
    }
}

module.exports = {
    checkAdminAuthorization,
    checkUserAuthorization
}