const passport = require('./passport');

const {
    errorHandler,
    apiErrorHandler
} = require('./error');

const {
    checkAdminAuthorization,
    checkUserAuthorization
} = require('./authorization');

const {
    preUpdateUser
} = require('./form');

const {
    upload
} = require('./multer');


module.exports = {
    passport,
    errorHandler,
    apiErrorHandler,
    checkAdminAuthorization,
    checkUserAuthorization,
    preUpdateUser,
    upload
}