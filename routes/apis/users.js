const express = require('express');
const apiUserRouter = express.Router();

const {
    passport,
    preUpdateUser,
    upload
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


module.exports = apiUserRouter;