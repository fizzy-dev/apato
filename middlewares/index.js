const passport = require('./passport');
const errorHandler = require('./errorHandler');
const {
    checkAdminAuthorization,
    checkUserAuthorization
} = require('./authorization');

module.exports = {
    passport,
    errorHandler,
    checkAdminAuthorization,
    checkUserAuthorization
}