const Router = require('koa-router');
const User = require('./user');
const Article = require('./article');
const Comment = require('./comment');

const router = new Router();

router.use('/user', User.routes(), User.allowedMethods());
router.use('/article', Article.routes(), Article.allowedMethods());
router.use('/comment', Comment.routes(), Comment.allowedMethods());


module.exports = router;