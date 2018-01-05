const Koa = require("koa");
const app = new Koa();
const server = require("http").createServer(app.callback());
const socket = require('socket.io')
const fs = require('fs');
const path = require('path')

// 路由
const Router = require("koa-router");
const router = new Router();

// 静态文件管理
const serve = require("koa-static");

const publicFiles = serve(path.join(__dirname, ""));
publicFiles._name = "test";

app.use(publicFiles);

router.get("/", (ctx, next) => {
    const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
    ctx.body = html;
});

app
   .use(router.routes())
   .use(router.allowedMethods());

const io = socket(server, {
  origins: "*:*"
});

// io.on("connection", client => {
//     console.log("connection1");
//     client.on("test", data => {
//         console.log(data);
//     });
//     client.on("disconnect", function() {
//         console.log("disconnect");
//     });
// });


server.listen(3031, function() {
  console.log("listening on *:3031");
});