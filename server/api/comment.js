const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

/**
 *  @GET '/comment'
 *  @获取活动评论数据接口，接口是公开的
 *  query id
 */
router.get('/', async ctx => {
    const id = ctx.query.id;
    try {
        const comments = await ctx.db.query(
            "select * from comment where activity_id = ?",
            [id]
        );

        ctx.status = 200;
        ctx.body = { comments: comments };
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});



/**
*  @POST '/comment/add'
*  @发表评论接口，接口是私密的，登录用户可参与评论
*/
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const data = ctx.request.body;
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const commnet = [
                ctx.state.user.id,
                data.content,
                data.activity_id,
                ctx.state.user.name
            ];

            const saveComment = await ctx.db.query(
                "insert into comment(user_id,content,activity_id,user_name) values(?,?,?,?)",
                commnet
            );
            if (saveComment.affectedRows > 0) {
                ctx.status = 200;
                ctx.body = { msg: "评论发表成功"};
            }
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

module.exports = router.routes();
