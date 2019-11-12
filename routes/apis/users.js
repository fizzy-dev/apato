const express = require('express');
const apiUserRouter = express.Router();

const {
    userController
} = require('../../controllers');

apiUserRouter.route('/')
.post(userController.createUser);

module.exports = apiUserRouter;