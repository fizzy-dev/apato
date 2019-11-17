const database = require('./database');

class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.profilePicture = user.profilePicture;
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
                    if (result[0]) {
                        resolve(new User(result[0]));
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            database.query('UPDATE User SET email = ?, password = ?, isAdmin = ?, firstName = ?, lastName = ?, profilePicture = ?',
            [this.email, this.password, this.isAdmin, this.firstName, this.lastName, this.profilePicture], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result[0]) {
                        resolve(new User(result[0]));
                    } else {
                        resolve(null);
                    }
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
                    if (result[0]) {
                        resolve(new User(result[0]));
                    } else {
                        resolve(null);
                    }
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
                    if (result[0]) {
                        resolve(new User(result[0]));
                    } else {
                        resolve(null);
                    }
                }
            });
        })
    }

}

module.exports = User;