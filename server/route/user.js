const Router = require('koa-router');
const User = require('../model/User.js');
const Article = require('../model/Article.js');
const { returnJSON } = require('../utils/retBody');
const Socket = require('../model/Socket');
const route = new Router();
const fs = require('fs');
const path = require('path');
route.post('/login', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const body = ctx.request.body;
  let resultUser = await User.findOne({
    username: body.username,
  });
  if (resultUser !== null) {
    if (resultUser.lockUntil < Date.now()) {
      let res = await resultUser.comparePassword(body.password, resultUser.password);
      if (res) {
        ctx.cookies.set('user', body.username, {
          maxAge: 1000 * 3600000,
        });
        ctx.cookies.set('uid', resultUser._id, {
          maxAge: 1000 * 3600000,
        });
        ctx.body = returnJSON('success', {
          userInfo: {
            username: resultUser.username,
            pseudonym: resultUser.pseudonym,
            meta: resultUser.meta,
            userID: resultUser._id,
            ucNotification: resultUser.unCheckedNotifications,
            avatar: resultUser.avatar,
          },
        });
      } else {
        ctx.body = returnJSON('failed', {
          time: resultUser.loginAttempts,
        });
      }
      await resultUser.incLoginAttempts(resultUser, res);
      next();
    } else {
      ctx.body = returnJSON('locked', {});
    }
  } else {
    ctx.body = returnJSON('not exist', {});
    next();
  }
});

route.post('/signIn', async ctx => {
  ctx.set('Content-Type', 'application/json');
  const body = ctx.request.body;

  let result = await User.findOne({
    username: body.username,
  });
  if (result !== null) {
    ctx.body = ctx.body = returnJSON('registered', {});
  } else {
    const user = new User({
      username: body.username,
      password: body.password,
    });
    let createUserResult = await user.save();
    if (createUserResult.username === body.username) {
      ctx.body = returnJSON('success', {});
    } else {
      ctx.body = returnJSON('failed', {});
    }
  }
});

route.get('/checkLogin', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const uid = ctx.cookies.get('uid');
  if (uid) {
    let resultUser = await User.findOne({
      _id: uid,
    });
    if (resultUser !== null) {
      ctx.body = returnJSON('success', {
        userInfo: {
          username: resultUser.username,
          pseudonym: resultUser.pseudonym,
          meta: resultUser.meta,
          userID: resultUser._id,
          ucNotification: resultUser.unCheckedNotifications,
          avatar: resultUser.avatar,
        },
      });
    } else {
      ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

route.get('/updateUcNotification', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const uid = ctx.cookies.get('uid');
  if (uid) {
    let resultUser = await User.findOne({
      _id: uid,
    });
    if (resultUser !== null) {
      ctx.body = returnJSON('success', {
        ucNotification: resultUser.unCheckedNotifications,
      });
    } else {
      ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
});
// picList: data.picList,
//     articleList: data.articleList,
//     recommendList: data.recommendList,
//     writerList: data.writerList
route.get('/init', async (ctx, next) => {
  ctx.body = returnJSON('success', {
    picList: [
      {
        picName: '手绘',
        picUrl:
          '//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
      {
        picName: '读书',
        picUrl:
          '//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
      {
        picName: '手绘',
        picUrl:
          '//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
      {
        picName: '读书',
        picUrl:
          '//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
      {
        picName: '手绘',
        picUrl:
          '//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
      {
        picName: '读书',
        picUrl:
          '//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
      {
        picName: '手绘',
        picUrl:
          '//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
      },
    ],
    recommendList: [
      {
        id: 1,
        imgUrl: 'http://jianshuavatar.flatpeach.xyz/7days.png',
      },
      {
        id: 2,
        imgUrl: 'http://jianshuavatar.flatpeach.xyz/30days.png',
      },
      {
        id: 3,
        imgUrl: 'http://jianshuavatar.flatpeach.xyz/prefer.png',
      },
      {
        id: 4,
        imgUrl: 'http://jianshuavatar.flatpeach.xyz/school.png',
      },
      {
        id: 5,
        imgUrl: 'http://jianshuavatar.flatpeach.xyz/rights.png',
      },
    ],
    writerList: [
      {
        avator:
          'http://upload.jianshu.io/users/upload_avatars/3343569/93161bfa-dda9-49ee-88e1-a85ec4227232.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
        name: '吴晓波',
        desc: '写了515k字 · 10.5k喜欢',
      },
      {
        avator:
          'http://upload.jianshu.io/users/upload_avatars/4263857/34d7b217-7338-48fe-81a1-98367fecdbee.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
        name: '王小麦',
        desc: '写了166.6k字 · 6.8k喜欢',
      },
    ],
  });
});

route.get('/logout', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const uid = ctx.cookies.get('uid');
  if (uid) {
    let result = await User.findOne({
      _id: uid,
    });
    if (result !== null) {
      ctx.cookies.set('user', '', {
        maxAge: 0,
      });
      ctx.cookies.set('uid', '', {
        maxAge: 0,
      });
      ctx.body = ctx.body = returnJSON('success', {});
    } else {
      ctx.body = ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

route.get('/isFollowed', async (ctx, next) => {
  const from = ctx.cookies.get('uid');
  const to = ctx.request.query.to;
  const author = await User.findById(to);
  const result = await User.isFollowed(author, from);

  ctx.body = returnJSON('success', {
    isFollowed: result,
  });
});

route.get('/follow', async (ctx, next) => {
  const uid = ctx.cookies.get('uid');
  const authorId = ctx.request.query.id;
  if (!uid || !authorId) {
    ctx.body = returnJSON('failed', {});
    await next();
    return;
  }

  const resUser = await User.update(
    { _id: authorId },
    {
      $push: {
        followerList: uid,
      },
    },
  );
  const resFollower = await User.update(
    { _id: uid },
    {
      $push: {
        followList: authorId,
      },
    },
  );
  if (resUser.ok === 1 && resFollower.ok === 1) {
    let isFollowed = await User.isFollowed(await User.findById(authorId), uid);
    ctx.body = returnJSON('success', { isFollowed });
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

route.delete('/follow', async (ctx, next) => {
  const uid = ctx.cookies.get('uid');
  const authorId = ctx.request.query.id;
  if (!uid || !authorId) {
    ctx.body = returnJSON('failed', {
      isFollowed: {},
    });
    await next();
  }
  const resAuthor = await User.update(
    { _id: authorId },
    {
      $pull: {
        followerList: uid,
      },
    },
  );
  const resFollower = await User.update(
    { _id: uid },
    {
      $pull: {
        followList: authorId,
      },
    },
  );
  if (resAuthor.ok === 1 && resFollower.ok === 1) {
    let isFollowed = await User.isFollowed(await User.findById(authorId), uid);
    ctx.body = returnJSON('success', { isFollowed });
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

route.post('/avatar', async (ctx, next) => {
  let body = ctx.request;
  let file = body.files.file;
  if (!fs.existsSync(path.resolve(__dirname, '../static/avatar'))) {
    fs.mkdirSync(path.resolve(__dirname, '../static/avatar'));
  }
  try {
    let username = ctx.cookies.get('user');
    let uid = ctx.cookies.get('uid');
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    // 创建可写流
    let filePath = path.join(__dirname, '../static/avatar', username) + '.jpg';
    let avatarPath = `http://localhost:8000/avatar/${username}.jpg`;
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    await reader.pipe(upStream);
    let user = await User.findById(uid, err => {
      ctx.body = returnJSON('failed', {
        err: 'no user id',
      });
    });
    if (user) {
      await user.update(
        {
          $set: {
            avatar: avatarPath,
          },
        },
        err => {
          if (err) {
            ctx.body = returnJSON('failed', {
              err,
            });
          }
        },
      );
    }

    ctx.body = returnJSON('success', {});
  } catch (err) {
    ctx.body = returnJSON('failed', {
      err,
    });
  }
});
// route.get('/init', async (ctx, next) => {
//   await User.updateMany({}, {
//     $pull: {
//       unCheckedNotifications: {},
//       checkedNotifications: {}
//     }
//   })
// })
route.get('/test', async (ctx, next) => {
  let socket = await Socket.deleteOne({ socketID: 'aBSMv5iw0eSfvSEqAAAA' });
  ctx.body = socket;
});
module.exports = route;
