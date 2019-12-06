const express = require('express');
const apiUserRouter = express.Router();

const {
    passport,
    preUpdateUser,
    upload,
    checkUserAuthorization
} = require('../../middlewares');
const {
    userController
} = require('../../controllers');

apiUserRouter.route('/')
.post(userController.createUser)
.put(upload.single('profilePicture'), preUpdateUser, userController.updateUser);

apiUserRouter.route('/sessions')
.post(passport.authenticate('local'), userController.createSession)
.delete(userController.destroySession);

apiUserRouter.route('/apartments/save')
.post(checkUserAuthorization, userController.saveApartment);

module.exports = apiUserRouter;