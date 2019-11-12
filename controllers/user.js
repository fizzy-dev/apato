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
        } = req.body

        // Kiểm tra email dùng chưa
        let existingEmail = await User.getUserByEmail(email);
        if (existingEmail[0]) return next(createError(409, 'Email is already used'));
        // Hash mật khẩu
        let hashedPassword = await genHash(password);
        // Tạo user mới
        let user = new User({ email, password: hashedPassword, isAdmin });
        await user.save();
        // Trả về json
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

const createSession = async (req, res, next) => {
    try {
        return res.json({
            status: 'success',
            msg: 'Session generated'
        });
    } catch (e) {
        console.log(e.message);
        next(createError(500, 'Unexpected Error'));
    }
}

const destroySession = async (req, res, next) => {
    try {
        req.logout();
        return res.json({
            status: 'success',
            msg: 'Session terminated'
        });
    } catch (e) {
        console.log(e.message);
        next(createError(500, 'Unexpected Error'));
    }
}

module.exports = {
    createUser,
    createSession,
    destroySession
}