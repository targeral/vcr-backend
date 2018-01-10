/**
 * chat room socket code
 * @param {server}
 */

const socket = require("socket.io");
const allowedOrigins = "localhost:* 127.0.0.1:*";
const Log = require('log')
    , log = new Log('socket');

module.exports = (server) => {
    const io = socket(server, {
        origins: "*:*"
    });

    io.on("connection", client => {
        log.info('socket 已连接', client.id);
        client.on('sendMsg', data => {
            console.log(data);
            client.emit('receiveMsg', {
                id: client.id,
                message: data.message,
                author: data.author || '张俊'
            });
            client.broadcast.emit('receiveMsg', {
                id: client.id,
                message: data.message,
                author: data.author || '张俊'
            });
        });
        client.on("disconnect", function() {
            console.log("disconnect");
        });
    });
}