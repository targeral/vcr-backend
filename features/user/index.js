const api = require('./api')

module.exports = (router, server) => {
    return api(router);
}
