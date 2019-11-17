const {
    awsService
} = require('../services');

const preUpdateUser = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        let url = await awsService.uploads3Image(req.file);
        req.body.profilePicture = url;
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    preUpdateUser
}