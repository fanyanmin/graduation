const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');

/**
 *  @POST '/upload/file'
 *  @上传文件接口 接口是私密的 需要token验证
 */
router.post('/file', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role =1",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const files = ctx.request.files;  //从表单数据中获取文件
            const urls=[];
            for (var i in files) {
                const file = files[i];
                // 创建可读流
                const rs = fs.createReadStream(file.path);
                // 重命名(时间戳拼接)
                const date = new Date();
                const newFileName = date.getTime() + '_' + file.name;
                // 创建可写流
                const ws = fs.createWriteStream(path.resolve(__dirname, '../files/', newFileName));
                // 管道链接传输
                await rs.pipe(ws);
                urls.push({
                    key:i,
                    url:'http://' + ctx.header.host + '/' + newFileName
                });
            }
            console.log(urls);
            ctx.status = 200;
            ctx.body = { urls: urls };
        } else {
            ctx.status = 404;
            ctx.body = { msg: '该账户不存在或不允许上传照片' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: '崩了！' };
    };
});

module.exports = router.routes();
