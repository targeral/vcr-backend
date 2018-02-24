const User = require('../controller/user');
const api = (r) => {
    r.post('login', (ctx, next) => {
        let { request: req, response: res } = ctx;
        res.body = User.login(req);
        res.status = 200;
        next();
    });
    r.post('register', (ctx, next) => {
        let { request: req, response: res } = ctx;
        res.body = User.register(req);
        res.status = 200;
        next();
    });
};

module.exports = api;