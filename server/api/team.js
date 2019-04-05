const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');



/**
 *  @GET '/team/all'
 *  @获取所有社团数据接口，接口是私密的
 *  query team
 */
router.get('/all', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 2",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const findTeam = await ctx.db.query(
                "select * from team",
            );
            ctx.status = 200;
            ctx.body = { msg: 'success', teams: findTeam };
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
 *  @POST '/team/add'
 *  @教师添加社团
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 2",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const data = ctx.request.body;
            // 数据添加到数据库
            const newTeam = [
                data.title,     //社团名称
                // data.c_date,  //创建时间
                data.description,   //社团描述
                data.size
            ];
            // 存
            const saveTeam =  await ctx.db.query(
                "insert into team(title,description,size) values(?,?,?)",
                newTeam
            );
            if(saveTeam.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"创建社团成功"};
            }
        } else {
            ctx.status = 300;
            ctx.body = { msg: '未登录或没有权限' };
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

/**
 *  @GET '/team/delete'
 *  @教师删除社团
 *  param id
 *  @接口是私密的
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 2",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const remove_id = ctx.query.id;
            // 删除操作
            const delTeam= await ctx.db.query(
                "delete from activity where id = ?",
                [remove_id]
            );
            if(delTeam.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"删除社团成功"};
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
 *  @POST 'team/set'
 *  @添加会长
 */
router.post('/set', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 2",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            //接收表单数据
            const data = ctx.request.body;
            // 验证数据
            const { errors, isValid } = await Valid.RegisterValid(data);
            if (!isValid) {
                ctx.status = 201;
                ctx.body = errors;
                return;
            }
            // 验证用户是否存在
            const exsitUser = await ctx.db.query(
                "select * from user WHERE phone=?",
                [data.phone]
            );
            if (exsitUser.length > 0) {
                ctx.status = 201;
                ctx.body = { msg: '此账号已存在，更换一个试试吧' };
            } else {
                // 添加社长
                const newUser = [
                    data.name,
                    data.phone,
                    md5('000000'),
                    "会长",
                    data.join1
                ];
                //添加到数据库
                try {
                    const savaUser = await ctx.db.query(
                        "insert into user(name,phone,password,position,join1) values(?,?,?,?,?)",
                        newUser
                    );
                    //设置会长
                    const setTeam = await ctx.db.query(
                        "update team set admin=? where id=?",
                        [data.name,data.id]
                    );

                    if (savaUser.affectedRows > 0 && setTeam.affectedRows>0) {
                        ctx.status = 200;
                        ctx.body = { msg: "添加社长成功" };
                    }
                } catch (e) {
                    ctx.status = 500;
                    ctx.body = { msg: "崩了" };
                }
            }
        } else {
            ctx.status = 201;
            ctx.body = { msg: "未登录或没有权限" };
        };
    } catch (e) {
        console.log(e);
    }
});

module.exports = router.routes();
