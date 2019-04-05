const Koa = require('koa');
const Router = require('koa-router');
const passport = require('koa-passport');
const KoaBody = require('koa-body');
const {APP_PORT} = require('./config');
const app = new Koa();
const db = require('./libs/db');

//控制访问来源
app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Headers','*');
    ctx.set('Access-Control-Allow-Origin','*');
    await next();
});

//定义路由
const router = new Router();

router.get('/',ctx=>{
    ctx.body = "hello";
});

router.use('/user',require('./api/user'));
router.use('/activity',require('./api/activity'));
router.use('/team',require('./api/team'));

//使用中间件
app.use(KoaBody());
//将数据库添加为上下问对象
app.context.db = db;
// 数据验证
app.use(passport.initialize());
app.use(passport.session());
// 回调passport
require('./libs/passport')(passport);


app.use(router.routes()).use(router.allowedMethods());
// 监听端口
app.listen(APP_PORT,()=>{
    console.log(`app is running at port ${APP_PORT}.`);
});