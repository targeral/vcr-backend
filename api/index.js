const Router = require('./Router');
const User = require('../controller/user');
const namespace = "/api/";

const API = (router) => {
    const r = new Router({ router, namespace });

    r.post('login', (ctx, next) => {
        User.login(ctx, next);
    });
    r.post('register', (ctx, next) => {
        User.register(ctx, next);
    });
};

module.exports = API;