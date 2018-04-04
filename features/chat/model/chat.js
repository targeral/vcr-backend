/**
 * chat room socket code
 * @param {server}
 */
const Log = require('log')
    , log = new Log('socket');

const socket = require('socket.io')

class Chat {
    constructor() {
        this.list = {};
    }

    initSocket(server) {
        const io = socket(server, {
            origins: "localhost:8080"
        }).of('/chatroom');

        io.on('connection', client => {
            client.emit('login', { msg: 'success' });
            log.info(`QAQ${client.id} 已连接`);
            this.addAClient(client);

            client.on('talkInHall', data => {
                client.emit('talkInHall', data);
            });

            client.on('disconnect', () => {
                log.info(`QAQ${client.id} 已离开`);
            });
        });
    }

    addAClient(client) {
        !this.list[client.id] && (this.list[client.id] = client);
    }
}

module.exports = Chat;
