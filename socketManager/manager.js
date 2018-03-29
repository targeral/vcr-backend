/**
 * 
 */

const socket = require('socket.io');
class socketManage {
    constructor(server, socketConfig, appList) {
        this.clientQueue = new Set();
        this.appList = appList || [];
        this.io = socket(server, socketConfig || {});
        this.initConnection(this.io);
    }

    initConnection (io) {
        io.on('connection', client => this.connection(client));
    }

    connection (client) {
        this.clientQueue.add(client.id);
        this.appList.forEach((app) => {
            app(client);
        });
        client.on("disconnection", reason => this.disconnection(client));
    }

    disconnection (client) {
        this.clientQueue.delete(client.id);
        this.appList.forEach((app) => {
            app.disconnection(client);
        })
    }

}