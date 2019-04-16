const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');



/**
 *  @GET '/activity/all'
 *  @获取所有活动数据接口，接口是私密的
 * 
 */
router.get('/all', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 2",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const findActivity = await ctx.db.query(
                "select * from activity",
            );
            ctx.status = 200;
            ctx.body = { msg: 'success', activity: findActivity };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});


/**
 *  @GET '/activity/id=?'
 *  @获取本社团所有活动，接口是私密的
 *  query team
 */
router.get('/', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const id = ctx.query.id;
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const findActivity = await ctx.db.query(
                "select * from activity where owner_id=?",
                [id]
            );
            ctx.status = 200;
            ctx.body = { msg: 'success', activity: findActivity };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});


/**
 *  @GET '/activity/member?team1=?&team2=?'
 *  @获取本人参与的活动，接口是私密的
 *  query team1 team2
 */
router.get('/member', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const team1 = ctx.query.team1;
        const team2 = ctx.query.team2;
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const findActivity = await ctx.db.query(
                "select * from activity where team=? or team=?",
                [team1,team2]
            );
            ctx.status = 200;
            ctx.body = { msg: 'success', activity: findActivity };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});



/**
 *  @POST '/activity/add'
 *  @添加活动，接口是私密的，需要token验证
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
            [ctx.state.user.id]
        );
        // console.log(user);
        if (user.length > 0) {
            const data = ctx.request.body;
            // 数据添加到数据库
            const newActivity = [
                data.title,     //活动名称
                // data.c_date,  //创建时间
                data.date1,  //活动开始时间
                data.date2, //活动结束时间
                data.description,   //活动描述
                data.place, //活动地点
                data.team,     //活动所属社团
                data.owner,      //社长
                ctx.state.user.id,
                data.file_dir
            ];
            // 存
            const saveActivity =  await ctx.db.query(
                "insert into activity(title,date1,date2,description,place,team,owner,owner_id,file) values(?,?,?,?,?,?,?,?,?)",
                newActivity
            );
            if(saveActivity.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"申请活动成功，等待老师审核通过后即可开始"};
            }
        } else {
            ctx.status = 300;
            ctx.body = { msg: '你不是系统用户，请不要尝试危险操作！' };
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

/**
 *  @GET '/activity/delete'
 *  @管理员删除活动
 *  param id
 *  @接口是私密的
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const remove_id = ctx.query.id;
            // 删除操作
            const delActivity= await ctx.db.query(
                "delete from activity where id = ?",
                [remove_id]
            );
            if(delActivity.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"删除成功"};
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: '崩了' };
    }
});

/**
 *  @GET '/activity/set?id=?&state=?'
 *  @老师审核接口，私密
 * 
 */
router.get('/set', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 2",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const updateActivity = await ctx.db.query(
                "update activity set status=? where id=?",
                [ctx.query.state,ctx.query.id]
            );
            if(updateActivity.affectedRows>0){
                ctx.status = 200;
                ctx.body = { msg: '处理成功！' };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});



/**
 *  @GET 'activity/detail'
 *  @活动详情接口，接口是公开的
 *  param id id有两种取值，一种是页码，另一种是商品ID
 */
router.get('/detail', async ctx => {
    const id = ctx.query.id;
    // console.log(id);
    // console.log(id.length);
    // 当id长度超过9位时，判断为商品详情
        try {
            const activity = await ctx.db.query(
                "select * from activity where id = ?",
                [id]
            );
            if(activity){
                ctx.status = 200;
                ctx.body = activity;
            }else{
                ctx.status = 500;
                ctx.body = { msg: "你要查看的活动不存在或已被删除" };
            }
        } catch (e) {
            console.log(e);
            ctx.status = 500;
            ctx.body = { msg: "崩了" };
        }
});


module.exports = router.routes();
