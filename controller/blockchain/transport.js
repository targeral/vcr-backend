const request = require('request');
const ip = require('ip');
const util = require('util');
// const _ = require('underscore');
const crypto = require('crypto');

// private props
const headers = Symbol('headers');
const loaded = Symbol('loaded');
const messages = Symbol('messages');

// private function 
const attachApi = Symbol('attachApi');
const hashsum = Symbol('hashsum');

const message = () => {}

class Transport {

    constructor(cb, scope) {
        this[headers] = {};
        this[loaded] = false;
        this[messages] = {};
    }

    [attachApi]() {}
    [hashsum](obj) {
        let buf = new Buffer(JSON.stringify(obj), 'utf-8');
        let hashdig = crypto.createHash('sha256').update(buf).digest();
        let temp = new Buffer(8);
        for (let i = 0; i < 8; i++) {
            temp[i] = hashdig[7 - i];
        }

    }

    broadcast() {}
    async getFromRandomPeer (config, options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = config;
            config = {};
        }
        config.limit = 1;
        // refer to async.retry。https://caolan.github.io/async/docs.html#retry
        let result;
        for (let index = 0; index < 20; index++) {
            result = await peer.list(config, (err, peers) => {
                if (!err && peers.length) {
                    let peer = perrs[0];
                    this.getFromPeer(peer, options, cb);
                } else {
                    return cb(err || "No peers in db");
                }
            });
        }
    }
    getFromPeer() {}
    sandboxApi() {}
    onBind() {}
    onBlockchainReady() {}
    onSignature() {}
    onUnconfirmTransaction() {}
    onNewBlock() {}
    onMessage() {}
    cleanup() {}
}

module.exports = Transport;