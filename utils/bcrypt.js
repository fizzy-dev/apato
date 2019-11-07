const bcrypt = require('bcryptjs');

function genHash(string) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(string, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function compareHash(candidate, string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidate, string, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
}

module.exports = {
    genHash,
    compareHash
}