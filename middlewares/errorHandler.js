const errorHandler = async (err, req, res, next) => {
    return res.render('pages/error', {
        error: err
    });
}

module.exports = errorHandler;