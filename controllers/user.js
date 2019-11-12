const createError = require('http-errors');

const {
    genHash
} = require('../utils');

const {
    User
} = require('../models');

const createUser = async (req, res, next) => {
    try {
        let {
            email,
            password,
            isAdmin
        } = req.body;

        console.log(email+' '+password+' '+password.length);

        let hashedPassword = await genHash(password);

        console.log(hashedPassword.length);

        let user = new User({ email, password: hashedPassword, isAdmin });
        await user.save();

        return res.json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (e) {
        console.log(e.message);
        next(createError(500, 'Unexpected Error'));
    }
}

module.exports = {
    createUser
}