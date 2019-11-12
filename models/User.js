const database = require('./database');

class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    validate() {
    }

    save() {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO User(email, password, isAdmin) VALUES(?,?,?)',
            [this.email, this.password, this.isAdmin], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
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

    static getUsers(offset, limit) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM user LIMIT ?, ?',[offset, limit], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = User;