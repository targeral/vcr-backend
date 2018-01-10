const fs = require('fs');
const path = require('path');


const view = {
    index() {
        return fs.readFileSync(`${__dirname}/template/index.html`, 'utf8');
    }
}

module.exports = view;