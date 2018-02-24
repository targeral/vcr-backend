const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbfile = path.join(`${__dirname}/peer.json`);
const adapter = new FileSync(dbfile);
const db = low(adapter);

db
.defaults({
    peers: []
})
.write();

module.exports = {
    peers: db.get('peers'),
    db: db
};
