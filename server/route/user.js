const Router = require('koa-router');
const User = require('../model/User.js');
const Article = require('../model/Article.js');
const { returnJSON } = require('../utils/retBody');

const route = new Router();

route.post('/login', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const body = ctx.request.body;
  let resultUser = await User.findOne({
    username: body.username
  });
  if (resultUser !== null && resultUser.lockUntil < Date.now()) {
    let res = await resultUser.comparePassword(body.password, resultUser.password);
    if (res) {
      ctx.cookies.set('user', body.username, {
        maxAge: 1000 * 3600000,
      })
      ctx.cookies.set('uid', resultUser._id, {
        maxAge: 1000 * 3600000,
      })
      ctx.body = returnJSON('success', {
        userInfo: {
          username: resultUser.username,
          pseudonym: resultUser.pseudonym,
          meta: resultUser.meta,
          userID: resultUser._id,
          ucNotification: resultUser.unCheckedNotifications
        }
      });
    } else {
      ctx.body = returnJSON('failed', {});
    }
    await resultUser.incLoginAttempts(resultUser, res);
    next();
    
  } else {
    ctx.body =  ctx.body = returnJSON('the account is not exist or is locked', {});
    next();
  }
})

route.post('/signIn', async (ctx) => {
  ctx.set('Content-Type', 'application/json');
  const body = ctx.request.body;

  let result = await User.findOne({
    username: body.username
  });
  if (result !== null) {
    ctx.body =  ctx.body = returnJSON('this count has been register', []);
  } else {
    const user = new User({
      username: body.username,
      password: body.password
    });
    let createUserResult = await user.save();
    if (createUserResult.username === body.username) {
      ctx.body = returnJSON('success', {});
    } else {
      ctx.body = returnJSON('failed', {});
    }
    
  }
})



route.get('/checkLogin', async(ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const uid = ctx.cookies.get('uid');
  if (uid) {
    let resultUser = await User.findOne({
      _id: uid
    });
    if (resultUser !== null) {
      ctx.body = returnJSON('success', {
        userInfo: {
          username: resultUser.username,
          pseudonym: resultUser.pseudonym,
          meta: resultUser.meta,
          userID: resultUser._id,
          ucNotification: resultUser.unCheckedNotifications
        }
      });
    } else {
      ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
  
})
// picList: data.picList,
//     articleList: data.articleList,
//     recommendList: data.recommendList,
//     writerList: data.writerList
route.get('/init', async(ctx, next) => {
  ctx.body = returnJSON('success', {
    "picList": [{
      "picName": "手绘",
      "picUrl": "//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }, {
      "picName": "读书",
      "picUrl": "//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }, {
      "picName": "手绘",
      "picUrl": "//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }, {
      "picName": "读书",
      "picUrl": "//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }, {
      "picName": "手绘",
      "picUrl": "//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }, {
      "picName": "读书",
      "picUrl": "//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }, {
      "picName": "手绘",
      "picUrl": "//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
    }],
    "recommendList": [{
      "id": 1,
      "imgUrl": "http://ouck2t8ui.bkt.clouddn.com/7days.png"
    }, {
      "id": 2,
      "imgUrl": "http://ouck2t8ui.bkt.clouddn.com/30days.png"
    }, {
      "id": 3,
      "imgUrl": "http://ouck2t8ui.bkt.clouddn.com/prefer.png"
    }, {
      "id": 4,
      "imgUrl": "http://ouck2t8ui.bkt.clouddn.com/school.png"
    }, {
      "id": 5,
      "imgUrl": "http://ouck2t8ui.bkt.clouddn.com/rights.png"
    }],
    "writerList": [
      {
        "avator": "http://upload.jianshu.io/users/upload_avatars/3343569/93161bfa-dda9-49ee-88e1-a85ec4227232.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96",
        "name": "吴晓波",
        "desc": "写了515k字 · 10.5k喜欢"
      },
      {
        "avator": "http://upload.jianshu.io/users/upload_avatars/4263857/34d7b217-7338-48fe-81a1-98367fecdbee.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96",
        "name": "王小麦",
        "desc": "写了166.6k字 · 6.8k喜欢"
      }
    ]
  })
})

route.get('/logout', async(ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const uid= ctx.cookies.get('uid');
  if (uid) {
    let result = await User.findOne({
      _id: uid
    });
    if (result !== null) {
      ctx.cookies.set('user', '', {
        maxAge: 0,
      })
      ctx.cookies.set('uid', '', {
        maxAge: 0,
      })
      ctx.body =  ctx.body = returnJSON('success', {});
    } else {
      ctx.body =  ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
  
})


route.get('/isFollowed', async (ctx, next) => {
  const from = ctx.request.query.from;
  const to = ctx.request.query.to;
  const author = await User.findById(to);
  const result = await User.isFollowed(author, from);

  ctx.body = returnJSON('success', {
    isFollowed: result
  });
})

route.get('/follow', async (ctx, next) => {
  const uid = ctx.cookies.get('uid');
  const authorId = ctx.request.query.id;
  if (!uid || !authorId) {
    ctx.body = returnJSON('failed', {});
    await next();
    return;
  }

  const resUser = await User.update({_id: authorId},{
    $push: {
      followerList: uid
    }
  });
  const resFollower = await User.update({_id: uid},{
    $push: {
      followList: authorId
    }
  });
  if (resUser.ok === 1 && resFollower.ok === 1) {
    let isFollowed = await User.isFollowed(await User.findById(authorId), uid);
    ctx.body = returnJSON("success", {isFollowed});
  } else {
    ctx.body = returnJSON("failed", {});
  }
  
})

route.delete('/follow', async (ctx, next) => {
  const uid = ctx.cookies.get('uid');
  const authorId = ctx.request.query  .id;
  if (!uid || !authorId) {
    ctx.body = returnJSON('failed', {
      isFollowed: {}
    });
    await next();
  }
  const resAuthor = await User.update({_id: authorId},{
    $pull: {
      followerList: uid
    }
  });
  const resFollower = await User.update({_id: uid},{
    $pull: {
      followList: authorId
    }
  });
  if (resAuthor.ok === 1 && resFollower.ok === 1) {
    let isFollowed = await User.isFollowed(await User.findById(authorId), uid);
    ctx.body = returnJSON("success", {isFollowed});
  } else {
    ctx.body = returnJSON("failed", {});
  }
  
})


// route.get('/init', async (ctx, next) => {
//   await User.updateMany({}, {
//     $pull: {
//       unCheckedNotifications: {},
//       checkedNotifications: {}
//     }
//   })
// })
module.exports = route;