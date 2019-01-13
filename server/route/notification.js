const Router = require('koa-router');
const ObjectId = require('mongoose').Types.ObjectId;
const Comment = require('../model/Comment');
const { returnJSON } = require('../utils/retBody');
const router = new Router();
const User = require('../model/User');
const Article = require('../model/Article');
const Notification = require('../model/Notification');

const getNotificationList = (type, notificationList) => {
  let promiseList = [];
  switch (type) {
    case 'article':
      promiseList = notificationList.map(async (item, index) => {
        const notification = await Notification.findById(item.id);
        const article = await Article.findById(notification.contentId);
        if (article !== null) {
          return await {
            pseudonym: article.pseudonym,
            title: article.title,
            meta: article.meta,
            _id: article._id,
            cid: item.id,
          };
        } else {
          return {};
        }
      });
      break;
    case 'acomment':
      promiseList = notificationList.map(async (item, index) => {
        const notification = await Notification.findById(item.id);
        const comment = await Comment.findById(notification.contentId);
        let article = comment ? await Article.findById(comment.ArticleID) : null;
        return await {
          type: 'acomment',
          pseudonym: comment ? comment.pseudonym : '',
          title: article ? article.title : '',
          articleId: article ? article._id : '',
          content: comment ? comment.content : '',
          meta: comment ? comment.meta : {},
          _id: comment ? comment._id : '',
          cid: item.id,
        };
      });
      break;
    case 'ccomment':
      promiseList = notificationList.map(async (item, index) => {
        const notification = await Notification.findById(item.id);
        const comment = await Comment.findById(notification.contentId);
        const article = await Article.findById(comment.ArticleID);
        const rcomment = await Comment.findById(comment.CommentID);
        return await {
          type: 'ccomment',
          pseudonym: comment.pseudonym,
          content: comment.content,
          articleId: article._id,
          rcontent: rcomment.content,
          meta: comment.meta,
          _id: comment._id,
          cid: item.id, // cid 是通知的id
        };
      });
      break;
    default:
      break;
  }

  return Promise.all(promiseList);
};

router.get('/list', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const type = ctx.request.query.type;
  const uid = ctx.cookies.get('uid');
  if (!type || !uid) {
    ctx.body = returnJSON('failed', {});
    await next();
    return;
  }
  const ucTypeNotifications = (await User.findById(uid)).unCheckedNotifications.filter(item => item.type === type);
  if (ucTypeNotifications.length) {
    let notificationList = await getNotificationList(type, ucTypeNotifications);
    ctx.body = returnJSON('success', {
      list: notificationList,
    });
  } else {
    ctx.body = returnJSON('failed', {
      list: [],
    });
  }
});

router.get('/checked', async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  const contentId = ctx.request.query.cid;
  const uid = ctx.cookies.get('uid');
  if (!contentId || !uid) {
    ctx.body = returnJSON('failed', {});
    await next();
    return;
  }
  const resUser = await User.findById(uid);
  if (resUser !== null) {
    const checkedItem = resUser.unCheckedNotifications.filter(item => item.id == contentId)[0];
    if (checkedItem) {
      await resUser.update({
        $pull: {
          unCheckedNotifications: {
            id: ObjectId(contentId),
          },
        },
        $push: {
          checkedNotifications: checkedItem,
        },
      });
      ctx.body = returnJSON('success', {});
    } else {
      ctx.body = returnJSON('failed', {});
    }
  } else {
    ctx.body = returnJSON('failed', {});
  }
});
//
module.exports = router;
