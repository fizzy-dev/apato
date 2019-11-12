const errorHandler = async (err, req, res, next) => {
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