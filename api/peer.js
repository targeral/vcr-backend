const NAMESPACE = 'peers/';
const validator = require('./helper/joi-query-validator.js');

const SCHEMA = {
    'peers': {
        state: {
            type: 'number',
            integer: true,
            min: 0,
            max: 3
        },
        os: {
            type: 'string'
        },
        version: {
            type: 'string'
        },
        limit: {
            type: 'number',
            integer: true,
            min: 0,
            max: 100
        },
        shared: {
            type: 'number',
            integer: true,
            min: 0,
            maximum: 1
        },
        orderBy: {
            type: 'string'
        },
        offset: {
            type: 'number',
            integer: true,
            min: 0
        },
        port: {
            type: 'number',
            integer: true,
            min: 1,
            max: 65535
        }
    },
    'peers/get': {
        ip_str: {
            type: 'string',
            min: 1,
            required: true
        },
        port: {
            type: 'number',
            min: 0,
            max: 65535,
            required: true
        }
    }
};

const api = (r) => {
    r.get(
        `${NAMESPACE}`, 
        validator(SCHEMA[`${NAMESPACE}`]),
        (ctx, next) => {
            let { request: req, rescponse: res } = ctx;
            next();
            console.log('sss')
            ctx.body = 'hello world';
        }
    );

    r.get(`${NAMESPACE}version`, (ctx, next) => {
        let { request: req, response: res } = ctx;
        next();
    });

    r.get(
        `${NAMESPACE}get`,
        validator(SCHEMA[`${NAMESPACE}get`]),
        (ctx, next) => {
            let { request: req, response: res } = ctx;
            ctx.body = `${NAMESPACE}get`;
            next();
        }
    );
};

module.exports = api;