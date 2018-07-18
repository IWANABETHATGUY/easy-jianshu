const Router = require('koa-router');
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
    userID: body.userID
  });
  let resArticle = await article.save();
  if (resArticle !== null) {
    ctx.body = returnJSON('success', []);
  } else {
    ctx.body = returnJSON('failed', []);
  }
})

router.get('/articleList', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let page = ctx.request.query.page;
  page = page ? page : 1;
  let resArticle = await Article.find({}, null, {
    skip: (page - 1) * 5,
    limit: 5
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
          _id: item._id
        }
      })
    });
  } else {
    ctx.body = returnJSON('failed', {
      articleList: []
    });
  }
})


router.get('/getArticle', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let id = ctx.request.query.id;
  if (!id) {
    ctx.body = returnJSON('failed', {
      article: {}
    });
    await next();
  }
  let resArticle = await Article.findById(id);
  if (resArticle !== null) {
    ctx.body = returnJSON('success', {
      article: resArticle
    });
  } else {
    ctx.body = returnJSON('failed', {
      article: {}
    });
  }
})

router.get('/test', async (ctx, next) => {
  await Article.updateMany({}, {summary: '这是一段测试summary'});
})



module.exports = router;