const checkUserAuthorization = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
}

const checkAdminAuthorization = async (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next();
    } else {
        return res.redirect('/');
    }
}

module.exports = {
    checkAdminAuthorization,
    checkUserAuthorization
}