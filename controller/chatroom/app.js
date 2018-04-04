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
    }).of('/chat');

    io.on("connection", client => {
        client.emit('loginSucess', { msg: 'success'})
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
        client.on('joinroom', data => {
            let { room } = data
            console.log(room)
            client.join(room);
        })
        client.on('listen', data => {
            let { msg, room } = data
            console.log(data)
            client.to(room).emit('listen', { msg })
        })
        client.on("disconnect", function() {
            console.log("disconnect");
        });
    });
}