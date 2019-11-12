const passport = require('./passport');
const {
    errorHandler,
    apiErrorHandler
} = require('./error');
const {
    checkAdminAuthorization,
    checkUserAuthorization
} = require('./authorization');

module.exports = {
    passport,
    errorHandler,
    apiErrorHandler,
    checkAdminAuthorization,
    checkUserAuthorization
}