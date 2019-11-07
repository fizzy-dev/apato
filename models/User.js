const database = require('./database');

class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    validate() {
    }

    save() {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO User(username, password, isAdmin) VALUES(?,?,?)',
            [this.username, this.password, this.isAdmin], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM User WHERE username = ?', [username], function(err, result) {
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