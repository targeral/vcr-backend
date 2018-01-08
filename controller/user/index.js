const login = require('./login');
const register = require('./register');

class USER {
    login(ctx, next) {
        login(ctx);
        next();
    }
    register(ctx, next) {
        register(ctx);
        next();
    }
}

module.exports = new USER();
