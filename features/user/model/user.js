const login = require('./login');
const register = require('./register');

class User {
    constructor() {
        this.amount = 0;
    }
    login({ username, password }) {
        return login({ username, password });
    }
    register({ username, password }) {
        return register({ username, password });
    }
}

module.exports = User;
