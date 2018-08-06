const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('./route/index.js');
const { connect } = require('./model/db');
const { origin } = require('./utils/config');
const app = new Koa();

/**
 * 连接数据库
 */
(async () => {
  await connect();
})();
// const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);

app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", origin);
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 86400000);
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
  }
  await next();
})

app.use(Router.routes(), Router.allowedMethods());

// io.on('connection', (socket) => {
//   socket.emit('news', {hello: 'world'});
//   socket.on('my brother event', (data) => {
//     console.log(data);
//   })
// })

app.listen(8080, () => {
  console.warn('server listening at port 8080');
})
