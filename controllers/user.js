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
            location,
            about,
            id,
            firstName,
            lastName
        } = req.body;

        console.log(req.body);
        let user = await User.getUserById(id);
        if (!user[0]) {
            next(createError(404, 'User not found'));
        }
        user = new User(user[0]);
        console.log(user);
        if (profilePicture) {
            user.profilePicture = profilePicture;
        }
        if (location) {
            user.location = location;
        }
        if (about) {
            user.about = about;
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
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
        if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
            console.log(req.body.remember);
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
            console.log(req.body.remember);
        }
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

const saveApartment = async (req, res, next) => {
    try {
        let {
            apartmentId
        } = req.body;

        let userId = req.user.id;

        let check = await User.checkSavedApartment(userId, apartmentId);

        if (!check[0]) {
            await User.saveApartment(userId, apartmentId);
        } else {
            if (check[0].saved == '0') {
                console.log('0');
                await User.resaveApartment(userId, apartmentId);
            } else {
                console.log('1');
                await User.unsaveApartment(userId, apartmentId);
            }
        }
        return res.json({
            status: 'success',
            msg: 'Save or unsave apartment successful'
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
    saveApartment,
    createSession,
    destroySession,
    renderUser
}