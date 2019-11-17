const createError = require('http-errors');

const {
    bcrypt
} = require('../utils');

const {
    User
} = require('../models');

// APIs

const createUser = async (req, res, next) => {
    try {
        let {
            email, password,
            firstName, lastName,
            isAdmin
        } = req.body;

        // Kiểm tra email dùng chưa
        let existingEmail = await User.getUserByEmail(email);
        if (existingEmail[0]) return next(createError(409, 'Email is already used'));
        // Hash mật khẩu
        let hashedPassword = await bcrypt.genHash(password);
        // Tạo user mới
        let user = new User({ email, password: hashedPassword, isAdmin, firstName, lastName });
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
        next(createError(500, 'Unexpected error'));
    }
}

const updateUser = async (req, res, next) => {
    try {
        let {
            profilePicture,
            firstName,
            id
        } = req.body;
        let user = await User.getUserById(id);
        if (!user[0]) {
            next(createError(404, 'User not found'));
        }
        user = new User(user[0]);
        console.log(user);
        user.profilePicture = profilePicture;
        user.firstName = firstName;
        await user.update();

        return res.json({
            status: 'success',
            msg: 'Update user successful'
        });
    } catch (e) {
        console.log(e.message);
        next(createError(500, 'Unexpected error'));
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
        next(createError(500, 'Unexpected error'));
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
        next(createError(500, 'Unexpected error'));
    }
}

// Rendering

const renderUser = async (req, res, next) => {
    let { id } = req.params;
    let user = await User.getUserById(id);
    if (req.isAuthenticated()) {
        return res.render('pages/user', {
            currentUser: req.user,
            user: user[0]
        });
    }
    return res.render('pages/user', {
        user: user[0]
    });
}

module.exports = {
    createUser,
    updateUser,
    createSession,
    destroySession,
    renderUser
}