const Log = require('log');
const log = new Log('info');

const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

// 路由管理
const router = require('./routers')();

const tests = async (ctx, next) => {
    await next();
    log.info(ctx.headers);
}

const server = require("http").createServer(app.callback());

server.listen(3030, function() {
  console.log("listening on *:3030");
});

app.use(tests);

app
   .use(router.routes())
   .use(router.allowedMethods());

// app.use(cors({
//    origin: 'http://localhost:3031',
//    credentials: true
// }));

// 聊天室
const chatroom = require('./controller/chatroom/app');
chatroom(server);