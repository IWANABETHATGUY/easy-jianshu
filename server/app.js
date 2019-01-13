const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const Router = require('./route/index.js');
const { connect } = require('./model/db');
const { origin } = require('./utils/config');
const app = new Koa();
const SocketModel = require('./model/Socket');
const User = require('./model/User');
/**
 * 连接数据库
 */
(async () => {
  await connect();
})();
// const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);

app.use(bodyParser());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 10 * 1024 * 1024,
      multipart: true,
    },
  }),
);
app.use(koaStatic(path.resolve(__dirname, './static')));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', origin);
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Max-Age', 86400000);
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
  }
  await next();
});

app.use(Router.routes(), Router.allowedMethods());

const server = require('http').Server(app.callback()),
  io = require('socket.io')(server);

io.on('connection', socket => {
  // console.log(socket);
  socket.on('disconnect', async () => {
    await SocketModel.deleteOne({ socketID: socket.id.toString() });
  });
  socket.on('logout', async () => {
    await SocketModel.deleteOne({ socketID: socket.id.toString() });
  });
  socket.emit('connected', socket.id);
  socket.on('init', async data => {
    const newSocket = new SocketModel({
      userID: data.uid,
      socketID: socket.id,
    });
    await newSocket.save();
  });
  socket.on('pubArticle', async data => {
    let publishSocket = await SocketModel.findOne({ socketID: socket.id });
    if (publishSocket) {
      let publisher = await User.findById(publishSocket.userID.toString());
      if (publisher) {
        publisher.followerList.forEach(async item => {
          let followSocket = await SocketModel.findOne({ userID: item });
          if (followSocket) {
            await socket.to(followSocket.socketID.toString()).emit('update');
          }
        });
      }
    }
  });
  socket.on('notify', data => {
    // socket.to(data.socketId).emit('update', {type: 'i update a new article'});
  });
});
server.listen('8000', () => {
  console.log('server listening at 8000');
});
module.exports = app;
