/**
 * @name {routeManager}
 * @author {targeral}
 * @param {router}
 */


module.exports = () => {
    const Router = require("koa-router");
    const router = new Router();
    const fs = require("fs");
    router.get("/", (ctx, next) => {
        ctx.body = 'hello world' + Date.now();
    });

    router.get('/test', async(ctx, next) => {
        ctx.response.status = 200;
        ctx.response.body = 'test';
        await next();
    });
    return router;
}