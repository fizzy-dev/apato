const database = require('./database');

class User {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.profilePicture = user.profilePicture;
        this.location = user.location;
        this.about = user.about;
        this.phoneNumber = user.phoneNumber;
    }

    validate() {
    }

    save() {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO User(email, password, isAdmin, firstName, lastName) VALUES(?,?,?,?,?)',
            [this.email, this.password, this.isAdmin, this.firstName, this.lastName], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            database.query('UPDATE User SET email = ?, password = ?, isAdmin = ?, firstName = ?, lastName = ?, profilePicture = ?, location = ?, about = ? WHERE id = ?',
            [this.email, this.password, this.isAdmin, this.firstName, this.lastName, this.profilePicture, this.location, this.about, this.id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
            )
        });
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM User WHERE email = ?', [email], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }

    static getUserById(id) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM User WHERE id = ?', [id], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }

}

module.exports = User;