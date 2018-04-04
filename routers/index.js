/**
 * @name {routeManager}
 * @author {targeral}
 * @param {router}
 */

// const API = require('../api');
// const Views = require('../controller/views');

const KoaRouter = require('koa-router');
const user = require('../features/user');
const chat = require('../features/chat');

class Router {
    constructor(router, featurePath) {
        this.router = router;
        this.featurePath = featurePath;
    }

    get(path, fn) {
        this.router.get(`${this.featurePath}/${path}`, (ctx, next) => fn(ctx, next))
    }

    post(path, fn) {
        console.log(`${this.featurePath}/${path}`);
        this.router.post(`${this.featurePath}/${path}`, (ctx, next) => fn(ctx, next))
    }
}

const routerMap = (kr, server = {}) => {
    return routerConfigs => {
        routerConfigs.forEach(config => {
            let { feature, path } = config;
            feature(new Router(kr, path), server);
        });
        return kr;
    };
}


module.exports = (server = {}) => {
    const router = new KoaRouter();
    routerMap(router, server)([
        {
            path: '/user',
            feature: user,
        },
        {
            path: '/chat',
            feature: chat
        }
    ]);
    return router;
}
