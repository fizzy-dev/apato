const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const {
    BUCKET_NAME,
    SECRET_KEY,
    ACCESS_KEY,
    S3_REGION,
    S3_BASE_URL
} = require('../configs/config.json')[env].aws;

const {
    crypto
} = require('../utils');

const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
});

async function uploads3Image(file) {
    try {
        var key = `images/${crypto.genHash(`${Date.now() + Math.random()}` + path.extname(file.originalname), 'md5')}`;
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: 'image/png'
        };
        await s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`File upload successful: ${data.Location}`);
        });
        return `${S3_BASE_URL}/${key}`;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    uploads3Image
}