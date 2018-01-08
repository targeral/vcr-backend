const path = require('path');
const Log = require('log');
const log = new Log('info');

const Koa = require('koa');
const koaBody = require('koa-body')
const cors = require('@koa/cors');
const app = new Koa();

// 静态文件管理
const serve = require("koa-static");

const publicFiles = serve(path.join(__dirname, ""));
publicFiles._name = "public";

app.use(publicFiles);

// 路由管理
const router = require('./routers')();

const tests = async (ctx, next) => {
    // console.log('test1', ctx.request.body)
    await next();
    // console.log("test2", ctx.request.body);

    // log.info(ctx.headers);
}

const server = require("http").createServer(app.callback());

server.listen(3030, function() {
  console.log("listening on *:3030");
});

app.use(koaBody());
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