const Router = require('./Router');
const User = require('../controller/user');
const namespace = "/api/";
const orderlist = require('../datebase/orderlist/orderlist.json');

const API = (router) => {
    const r = new Router({ router, namespace });

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

    r.get('test', (ctx, next) => {
        ctx.body = '1';
        ctx.status = 200;
        next();
    });
    r.get('orderlist', (ctx, next) => {
        next();
        ctx.body = JSON.stringify(orderlist);
    });
};

module.exports = API;