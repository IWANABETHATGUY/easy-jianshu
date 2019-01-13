const Router = require('koa-router');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Article = require('../model/Article.js');
const { returnJSON } = require('../utils/retBody');
const router = new Router();

router.post('/addArticle', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const body = ctx.request.body;

  const article = new Article({
    pseudonym: body.pseudonym,
    content: body.content,
    title: body.title,
    tags: body.tags,
    userID: body.userID,
    summary: body.summary,
  });
  let resArticle = await article.save();
  if (resArticle !== null) {
    ctx.body = returnJSON('success', []);
  } else {
    ctx.body = returnJSON('failed', []);
  }
});

router.get('/articleList', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let page = ctx.request.query.page;
  page = page ? page : 1;
  let resArticle = await Article.find({}, null, {
    skip: (page - 1) * 5,
    limit: 5,
  });
  if (resArticle.length > 0) {
    ctx.body = returnJSON('success', {
      articleList: resArticle.map(item => {
        return {
          pseudonym: item.pseudonym,
          summary: item.summary,
          title: item.title,
          tags: item.tags,
          like: item.like,
          comment: item.comment,
          picUrl: item.picUrl,
          userID: item.userID,
          meta: item.meta,
          _id: item._id,
        };
      }),
    });
  } else {
    ctx.body = returnJSON('failed', {
      articleList: [],
    });
  }
});

router.get('/getArticle', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let articleId = ctx.request.query.id;
  let uid = ctx.cookies.get('uid') || '';
  if (!articleId) {
    ctx.body = returnJSON('failed', {
      article: {},
    });
    await next();
    return;
  }
  let resArticle = await Article.findById(articleId);
  if (resArticle !== null) {
    let isLiked = resArticle.likeList.filter(item => item == uid).length > 0;
    ctx.body = returnJSON('success', {
      article: {
        ...resArticle._doc,
        isLiked,
      },
    });
  } else {
    ctx.body = returnJSON('failed', {
      article: {},
    });
  }
});

router.get('/like', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let articleId = ctx.request.query.id;
  let uid = ctx.cookies.get('uid');
  if (!uid || !articleId) {
    ctx.body = returnJSON('failed', {});
    await next();
    return;
  }
  let resArticle = await Article.update(
    { _id: articleId },
    {
      $inc: {
        like: 1,
      },
      $push: {
        likeList: uid,
      },
    },
  );
  if (resArticle !== null) {
    ctx.body = returnJSON('success', {});
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

router.delete('/like', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let articleId = ctx.request.query.id;
  let uid = ctx.cookies.get('uid');
  if (!uid || !articleId) {
    ctx.body = returnJSON('failed', {});
    await next();
    return;
  }
  let resArticle = await Article.update(
    { _id: articleId },
    {
      $inc: {
        like: -1,
      },
      $pull: {
        likeList: uid,
      },
    },
  );
  if (resArticle !== null) {
    ctx.body = returnJSON('success', {});
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

router.get('/getTotalComment', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let id = ctx.request.query.id;
  if (!id) {
    ctx.body = returnJSON('failed', {
      total: -1,
    });
    await next();
  }
  let resArticle = await Article.findById(id);
  if (resArticle !== null) {
    ctx.body = returnJSON('success', {
      total: resArticle.comment,
    });
  } else {
    ctx.body = returnJSON('failed', {
      total: -1,
    });
  }
});

// router.get('/test', async (ctx, next) => {
//   const from = ctx.request.query.from;
//   const to = ctx.request.query.to;
//   ctx.body = returnJSON(+User.isFollowed(from, to), {});
// })

// TODO

module.exports = router;
