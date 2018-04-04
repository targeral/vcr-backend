const user = require('../model')();
const { ReqDate } = require('../../utils');

module.exports = (router) => {
    router.post('login', ({ request: req, response: res }, next) => {
        // let {
        //     request: req,
        //     response: res
        // } = ctx;
        let { username, password } = new ReqDate(req).get();
        let body = user.login({ username, password });
        res.body = body;
        res.status = 200;
        next();
    });

    router.post('register', (ctx, next) => {
        let { request: req, response: res } = ctx;        
        let { username, password } = new ReqDate(req).get();
        console.log(username, password)
        let body = user.register({ username, password });

        res.body = body;
        res.status = 200;
        next();
    });

    router.get('test', (ctx, next) => {
        ctx.body = 'ok';
        ctx.status = 200;
    });

    return router;
}
