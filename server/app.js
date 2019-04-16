const Koa = require('koa');
const Router = require('koa-router');
const passport = require('koa-passport');
const KoaBody = require('koa-body');
const {APP_PORT} = require('./config');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const db = require('./libs/db');

//控制访问来源
app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Headers','*');
    ctx.set('Access-Control-Allow-Origin','*');
    await next();
});

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './files'

app.use(static(
  path.join( __dirname,  staticPath)
));

// 使用文件访问中间件
app.use(KoaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
}));

//定义路由
const router = new Router();

router.get('/',ctx=>{
    ctx.body = "hello";
});

router.use('/user',require('./api/user'));
router.use('/activity',require('./api/activity'));
router.use('/team',require('./api/team'));
router.use('/upload',require('./api/upload'));
router.use('/comment',require('./api/comment'));

//使用中间件
// app.use(KoaBody());
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