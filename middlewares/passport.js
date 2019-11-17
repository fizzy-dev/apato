const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
    User
} = require('../models');

const {
    bcrypt
} = require('../utils');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        try {
            let user = await User.getUserByEmail(email);     
            if (!user[0]) {
                return done(null, false);
            }
            let correctPassword = await bcrypt.compareHash(password, user[0].password);
            if (!correctPassword) {
                return done(null, false);
            }
            return done(null, user[0]);
        } catch (e) {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    let user = await User.getUserById(id);
    delete user[0].password;
    done(null, user[0]);
});

module.exports = passport;