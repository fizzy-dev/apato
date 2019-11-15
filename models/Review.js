const database = require('./database');

class Review {
    constructor(review) {
        this.userId = review.userId;
        this.content = review.content;
        this.apartmentId = review.apartmentId;
    }

    validate() {
    }

    save() {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO Review(userId, content, apartmentId) VALUES(?,?)',
            [this.userId, this.content, this.apartmentId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getReviewsByApartment(apartmentId) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM Review WHERE apartmentId = ?', [apartmentId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }
}

module.exports = Review;