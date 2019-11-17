const crypto = require('crypto');

function genHash(string, algorithm = 'sha1') {
    return crypto.createHash(algorithm).update(string).digest('hex');
}

module.exports = {
    genHash
}