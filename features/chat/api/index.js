const chat = require('../model')();

module.exports = (router, server) => {
    chat.initSocket(server);
}
