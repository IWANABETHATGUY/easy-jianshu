const Router = require('koa-router');
const User = require('../model/User.js');
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
        domain: 'localhost',
      })
      ctx.cookies.set('uid', resultUser._id, {
        maxAge: 1000 * 3600000,
        domain: 'localhost',
      })
      ctx.body = returnJSON('success', {
        userInfo: {
          username: resultUser.username,
          pseudonym: resultUser.pseudonym,
          meta: resultUser.meta,
          userID: resultUser._id
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


route.get('/info', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let msg = {
    "success": true,
    "data": {
      "articleList": [{
        "title": "阿里腾讯百度头条美团iOS面试总结",
        "summary": "面试基本已经结束了，目前已拿头条、百度、腾讯offer，现在可以好好来写写总结了，关于面试题，可能没那么多时间来总结答案，有什么需要讨论的地方欢...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/12035157-bc61f8d98b31d953.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "小迪_57b5",
        "comment": 10,
        "like": 20
      }, {
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },{
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },{
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },{
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },
      {
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },
      {
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },{
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },
      {
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },
      {
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      },
      {
        "title": "那年七月，她走了",
        "summary": "那一年，是2011年。 同事们刚刚知道依依生了女儿没两天，还来不及去祝贺，竟又突然接到噩耗：她走了！ 谁也想不到，这个刚为人母的24岁姑娘，在凌...",
        "picUrl": "http://upload-images.jianshu.io/upload_images/11425432-f10db8f6d9553074.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
        "author": "繁花朵朵开",
        "comment": 43,
        "like": 31
      }]
    }
  }
  ctx.body = msg;
  await next();
})

route.get('/checkLogin', async(ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const uid = ctx.cookies.get('uid');
  if (uid) {
    let resultUser = await User.findOne({
      _id: uid
    });
    if (resultUser !== null) {
      ctx.body =  ctx.body = returnJSON('success', {
        userInfo: {
          username: resultUser.username,
          pseudonym: resultUser.pseudonym,
          meta: resultUser.meta,
          userID: resultUser._id
        }
      });
    } else {
      ctx.body =  ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
  
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
        domain: 'localhost',
      })
      ctx.cookies.set('uid', '', {
        maxAge: 0,
        domain: 'localhost',
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
  const result = await author.isFollowed(author, from);

  ctx.body = returnJSON('success', {
    isFollowed: result
  });
})

route.get('/follow', async (ctx, next) => {
  const uid = ctx.cookies.get('uid');
  const authorId = ctx.request.query.id;
  if (!uid || !authorId) {
    ctx.body = returnJSON('failed', {
      isFollowed: result
    });
    await next();
  }
  const resAuthor = await User.findById(authorId);

  const resUser = await resAuthor.update({
    $push: {
      followerList: uid
    }
  });
  if (resUser.ok === 1) {
    let isFollowed = await resAuthor.isFollowed(await User.findById(authorId), uid);
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
      isFollowed: result
    });
    await next();
  }
  const resAuthor = await User.findById(authorId);
  const resUser = await resAuthor.update({
    $pull: {
      followerList: uid
    }
  });
  if (resUser.ok === 1) {
    let isFollowed = await resAuthor.isFollowed(await User.findById(authorId), uid);
    ctx.body = returnJSON("success", {isFollowed});
  } else {
    ctx.body = returnJSON("failed", {});
  }
  
})
module.exports = route;