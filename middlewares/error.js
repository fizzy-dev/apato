const errorHandler = async (err, req, res, next) => {
    if (req.isAuthenticated()) {
        return res.render('pages/error', {
            error: err,
            currentUser: req.user
        });
    }
    return res.render('pages/error', {
        error: err
    });
}

const apiErrorHandler = async (err, req, res, next) => {
    console.log(err);
    return res.status(err.status).json({
        status: 'failed',
        err
    });
}

module.exports = {
    errorHandler,
    apiErrorHandler
};