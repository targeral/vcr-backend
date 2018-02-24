/**
 * @name {routeManager}
 * @author {targeral}
 * @param {router}
 */

const API = require('../api');
const Views = require('../controller/views');

module.exports = () => {
    const Router = require('koa-router');
    const router = new Router();
    const fs = require("fs");

    API(router);

    router.get("/", (ctx, next) => {
        ctx.body = Views.index();
        next();
    });

    router.get('/test', async(ctx, next) => {
        console.log(ctx.request);
        ctx.response.status = 200;
        ctx.response.body = 'test';
        await next();
    });
    return router;
}
