const database = require('./database');

class Apartment {
    constructor(apartment) {
        this.id = apartment.id;
        this.name = apartment.name;
        this.ownerId = apartment.ownerId;
        this.location = apartment.location;
        this.picture = apartment.picture;
        this.price = apartment.price;
        this.description = apartment.description;
        this.allowPets = apartment.allowPets;
        this.noSharing = apartment.noSharing;
        this.hasParkingLot = apartment.hasParkingLot;
        this.nearGroceries = apartment.nearGroceries;
        this.area = apartment.area;
        this.numberOfFloors = apartment.numberOfFloors;
        this.hasWifi = apartment.hasWifi;
        this.hasTv = apartment.hasTv;
        this.bedrooms = apartment.bedrooms;
        this.kitchen = apartment.kitchen;
        this.security = apartment.security;
    }

    validate() {
    }

    save() {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO Apartment(name, ownerId, location, description, price, picture, allowPets, noSharing, hasParkingLot, nearGroceries, area, numberOfFloors, hasWifi, hasTv, bedrooms, kitchen, security) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [this.name, this.ownerId, this.location, this.description, this.price, this.picture, this.allowPets, this.noSharing, this.hasParkingLot, this. nearGroceries, this.area, this.numberOfFloors, this.hasWifi, this.hasTv, this.bedrooms, this.kitchen, this.security], function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    static getApartmentById(id) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM Apartment WHERE Apartment.id = ?', [id], function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getApartmentsByOwner(ownerId) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM Apartment WHERE ownerId = ?', [ownerId], function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getApartmentsByKeyword(keyword, offset, limit) {
        return new Promise((resolve, reject) => {
            console.log(keyword);
            database.query('SELECT * FROM Apartment WHERE name LIKE ? OR location LIKE ? LIMIT ?,?; SELECT COUNT(*) as count FROM Apartment WHERE name LIKE ? OR location LIKE ?',
                [`%${keyword}%`, `%${keyword}%`, offset, limit, `%${keyword}%`, `%${keyword}%`], function (err, results) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                });
        });
    }

    static getSavedApartments(userId) {
        return new Promise((resolve, reject) => {
            database.query('SELECT Apartment.* FROM Apartment INNER JOIN UserSaveApartment ON Apartment.id = UserSaveApartment.apartmentId WHERE UserSaveApartment.userId = ?',
                [userId], function (err, results) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                });
        });
    }

    static getOwnApartments(userId) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM Apartment WHERE ownerId = ?',
                [userId], function (err, results) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                });
        });
    }

    static getReviews(apartmentId) {
        return new Promise((resolve, reject) => {
            database.query('SELECT Review.*, User.firstName AS userFirstName, User.lastName AS userLastName, User.profilePicture AS userProfilePicture FROM Review INNER JOIN User ON Review.userId = User.id WHERE apartmentId = ? ORDER BY Review.createdAt DESC', [apartmentId], function (err, results) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        });
    }

    static makeReviews(review) {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO Review(apartmentId, userId, content) VALUES(?,?,?)', [review.apartmentId, review.userId, review.content], function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Apartment;