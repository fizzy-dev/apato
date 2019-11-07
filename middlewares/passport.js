const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const {
    User
} = require('../models');

const {
    compareHash
} = require('../utils');


passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async function (username, password, done) {
        try {
            let user = await User.getUserByUsername(username);     
            if (!user[0]) {
                return done(null, false);
            }
            let correctPassword = await compareHash(password, user[0].password);
            if (!correctPassword) {
                return done(null, false);
            }
            return done(null, user);
        } catch (e) {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;