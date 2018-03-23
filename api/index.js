const namespace = "/api/";
const Router = require('./helper/Router');
const userAPI = require('./user');
const peerAPI = require('./peer');
const blogAPI = require('./blog');

const API = (router) => {
    const r = new Router({ router, namespace });

    userAPI(r);
    blogAPI(r);

    r.get('test', (ctx, next) => {
        console.log(ctx.request.query)
        ctx.body = '1';
        ctx.status = 200;
        next();
    });
};

module.exports = API;