const ip = require('ip');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const transport = require('./transport');
const { peers: peersDB, db } = require('../../datebase/blockchain/peer');

const to = promise => promise.then(data => [null, data]).catch(err => [err]);

// private function
const attachApi = Symbol('attachApi');
const updatePeerList = Symbol('updatePeerList');
const count = Symbol('count');
const banManager = Symbol('banManager');
const getByFilter = Symbol('getByFilter');

const getPeers = (req, cb) => {};
const getPeer = (req, cb) => {};
const version = (req, cb) => {};

class Peer {
    constructor(cb, scope) {

    }

    [attachApi]() {}
    [updatePeerList](cb) {
        transport.getFromRandomPeer();
    }
    async [count](cb) {
        let a = await db.read();
        console.log(a.value());
        // let [err, rows] = await to(peersDB.value().read());
        // if (err) {
        //     console.log('Peer#count', err);
        //     return cb(err);
        // }
        // var res = rows.length && rows[0].count;
        // cb(null, res);
    }
    [banManager]() {}
    [getByFilter](filter, cb) {}

    list(options, cb) {
        options.limit = options.limit || 100;
    }

    state(pip, port, state, timeoutSeconds, cb) {
    }

    remove(pip, port, cb) {}
    addDapp(config, cb) {}
    update(peer, cb) {}
    sandboxApi(call, args, cb) {}
    onBind(scope) {}
    async onBlockchainReady() {
        let peerList = config.peers.list;
        try {
            for (let peer of peerList) {
                let LIST = {
                    ip: ip.toLong(peer.ip),
                    port: peer.port,
                    state: 2,
                    sharePort: Number(true)
                };
                console.log(peersDB.indexOf(LIST, (a, b) => {
                    console.log(a, b)
                    return a.ip = b.ip;
                }).value());
                !peersDB.has(LIST).value() && await peersDB.push(LIST).write();
            }
            this[count]((err, count) => {
                if (count) {
                    this[updatePeerList]();
                    console.log('Peers ready, stored ' + count);
                } else {
                    console.log('Peers list is empty');
                }
            })
        } catch(err) {
            console.log('onBlockchainReady', err);
        }
    }
    onPeerReady() {}
}

module.exports = Peer;