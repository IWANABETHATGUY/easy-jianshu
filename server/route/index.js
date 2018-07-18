const Router = require('koa-router');
const User = require('./user');
const Article = require('./article');

const router = new Router();

router.use('/user', User.routes(), User.allowedMethods());
router.use('/article', Article.routes(), Article.allowedMethods());


module.exports = router;