const Router = require('koa-router');
// const ObjectId = require('mongoose').Types.ObjectId;
const Comment = require('../model/Comment');
const { returnJSON } = require('../utils/retBody');
const router = new Router();

const getReplyList = replyList => {
  let replyPromiseList = replyList.map(id => {
    return new Promise((resolve, reject) => {
      Comment.findOne({ _id: id })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
  return Promise.all(replyPromiseList);
};

router.post('/addComment', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const body = ctx.request.body;

  const comment = new Comment({
    pseudonym: body.pseudonym,
    content: body.content,
    ArticleID: body.articleId,
    replyToC: body.rtc,
    userID: body.userID,
    //commentID: 是你回复的comment，如果没有不用填
    CommentID: body.cid,
    underCommentID: body.ucid,
  });
  let resComment = await comment.save();
  if (resComment !== null) {
    ctx.body = returnJSON('success', []);
  } else {
    ctx.body = returnJSON('failed', []);
  }
});

router.get('/commentList', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  let page = ctx.request.query.page;
  let articleId = ctx.request.query.id;
  if (!articleId) {
    ctx.body = returnJSON('no articleId', {
      commentList: [],
    });
    await next();
  }
  page = page ? page : 1;
  let resComment = await Comment.find({ ArticleID: articleId, replyToC: false }, null, {
    skip: (page - 1) * 10,
    limit: 10,
  });

  if (resComment.length > 0) {
    let commentList = await resComment.map(async item => {
      return {
        pseudonym: item.pseudonym,
        content: item.content,
        like: item.like,
        replyCount: item.replyCount,
        userID: item.userID,
        commentReplyList: await getReplyList(item.replyList.slice(0, 10)),
        meta: item.meta,
        _id: item._id,
        underCommentID: item.underCommentID,
      };
    });

    let res = await Promise.all(commentList);
    ctx.body = returnJSON('success', {
      commentList: res,
    });
  } else {
    ctx.body = returnJSON('failed', {
      commentList: [],
    });
  }
});

// router.get('/getArticle', async (ctx, next) => {
//   ctx.set('Content-Type', 'application/json');
//   let id = ctx.request.query.id;
//   if (!id) {
//     ctx.body = returnJSON('failed', {
//       article: {}
//     });
//     await next();
//   }
//   let resArticle = await Article.findById(id);
//   if (resArticle !== null) {
//     ctx.body = returnJSON('success', {
//       article: resArticle
//     });
//   } else {
//     ctx.body = returnJSON('failed', {
//       article: {}
//     });
//   }
// })

// router.get('/test', async (ctx, next) => {
//   await Comment.updateMany({}, {commentList: []});
// })

router.delete('/delete', async (ctx, next) => {
  const id = ctx.request.query.id;
  if (!id) {
    ctx.body = returnJSON('failed', {});
    await next();
  }
  let resComment = await Comment.findById(id);
  await resComment.remove();
  if (resComment !== null) {
    ctx.body = returnJSON('success', {});
  } else {
    ctx.body = returnJSON('failed', {});
  }
});

module.exports = router;
