const login = require('./login');
const register = require('./register');

class USER {
    login(req) {
        let { body: { username, password } } = req;
        return login(username, password);
    }
    register(req) {
        let { body: { username, password } } = req;
        return register(username, password);
    }
}

module.exports = new USER();
