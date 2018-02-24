const namespace = "/api/";
const Router = require('./helper/Router');
const userAPI = require('./user');
const peerAPI = require('./peer');
const orderlist = require('../datebase/orderlist/orderlist.json');
const orderdetail = require('../datebase/orderlist/orderdetail.json');
const refundapply = require('../')
const counts = 0;

const API = (router) => {
    const r = new Router({ router, namespace });

    userAPI(r);

    r.get('test', (ctx, next) => {
        console.log(ctx.request.query)
        ctx.body = '1';
        ctx.status = 200;
        next();
    });
    r.get('orderlist', (ctx, next) => {
        next();
        console.log(orderlist)
        ctx.body = JSON.stringify(orderlist);
        ctx.type = "text/html; charset=UTF-8";
    });
    r.get('orderdetail', (ctx, next) => {
        next();
        ctx.body = JSON.stringify(orderdetail);
        ctx.type = 'text/html; charset=UTF-8';
    });
    r.get('refundapply', (ctx, next) => {
        next();
        ctx.body = JSON.stringify()
    })

    r.get('point', (ctx, next) => {
        next();
        ctx.body = '';
        console.log('point');
    });
    r.get('point1', (ctx, next) => {
        next();
        ctx.body = '';
        console.log('point1');
    });
};

module.exports = API;