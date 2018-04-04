const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbfile = path.join(`${__dirname}/db_user.json`);
const adapter = new FileSync(dbfile);
const db = low(adapter);

console.log(dbfile)

db
.defaults({
    user: []
})
.write();

module.exports = {
    user: db.get('user'),
    db: db
};
