const database = require('./database');

class Apartment {
    constructor(apartment) {
        this.name = apartment.name;
        this.ownerId = apartment.ownerId;
    }

    validate() {
    }

    save() {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO Apartment(name, ownerId) VALUES(?,?)',
            [this.name, this.ownerId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getApartmentsByOwner(ownerId) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM Apartment WHERE ownerId = ?', [ownerId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }
}

module.exports = Apartment;