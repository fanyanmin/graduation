const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const Valid = require('../libs/valid');
const passport = require('koa-passport');
const md5 = require('../libs/md5');
const config = require('../config');


/**
 *  @GET '/user?id=?'
 *  @获取个人信息接口，接口是私密的
 * 
 */
router.get('/', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {

            ctx.status = 200;
            ctx.body = { msg: 'success', user: user };

        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户不存在' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});



/**
 *  @POST '/user/login'
 *  @登录接口，接口是公开的
 *  登录成功生成token
 */
router.post('/login', async ctx => {
    const data = ctx.request.body;
    // 数据验证
    const { errors, isValid } = await Valid.loginValid(data);

    if (!isValid) {
        ctx.status = 201;
        ctx.body = errors;
        return;
    }
    // 登陆信息校验
    const find = await ctx.db.query(
        //sql查询
        "select * from user where id=?",
        [data.id]
    );
    if (find.length < 1) {
        ctx.status = 201;
        ctx.body = { msg: '用户不存在！' };
        return;
    }
    const user = JSON.parse(JSON.stringify(find[0]));

    if (!user) {
        ctx.status = 201;
        ctx.body = { msg: '用户不存在！' };
    } else {
        // 验证密码
        if (md5(data.password) == user.password) {
            // 密码对，生成token
            const payload = { id: user.id, name: user.name };
            const token = jwt.sign(payload, config.TOKEN_KEY, { expiresIn: config.TOKEN_VALID_TIME });
            ctx.status = 200;
            ctx.body = { success: true, token: "Bearer " + token, user: user };
        } else {
            ctx.status = 201;
            ctx.body = { msg: '密码错误！' };
        }
    }
});


/**
 *  @POST 'user/add'
 *  @添加用户接口，接口是私密的
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
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
                "select * from user WHERE id=?",
                [data.id]
            );
            if (exsitUser.length > 0) {
                //判断该成员是否加入第二个社团
                // console.log(exsitUser);
                const updateUser = await ctx.db.query(
                    "update user set join2=?",
                    [data.join]
                );
                if (updateUser.affectedRows > 0) {
                    await ctx.db.query(
                        "update team set number=number+1 where title=?",
                        [data.join]
                    );
                    ctx.status = 200;
                    ctx.body = { msg: "添加成员成功" };
                }
            } else {
                // 添加用户首次信息
                const newUser = [
                    data.id,
                    data.name,
                    data.phone,
                    data.sex,
                    md5('000000'),
                    data.college,
                    data.temp_class,
                    data.position,
                    data.join
                ];
                //添加到数据库
                try {
                    const savaUser = await ctx.db.query(
                        "insert into user(id,name,phone,sex,password,college,class,position,join1) values(?,?,?,?,?,?,?,?,?)",
                        newUser
                    );
                    if (savaUser.affectedRows > 0) {
                        await ctx.db.query(
                            "update team set number=number+1 where title=?",
                            [data.join]
                        );
                        ctx.status = 200;
                        ctx.body = { msg: "添加成员成功" };
                    }
                } catch (e) {
                    ctx.status = 500;
                    ctx.body = { msg: "崩了" };
                    console.log(e);
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


/**
 *  @GET '/user/all?team=?'
 *  @获取本社团所有成员数据接口，接口是私密的
 *  query team
 */
router.get('/all', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const findUser = await ctx.db.query(
                "select * from user where join1 = ? or join2 = ?",
                [ctx.query.team, ctx.query.team]
            );
            if (findUser.length > 0) {
                ctx.status = 200;
                ctx.body = { msg: 'success', users: findUser };
            } else {
                ctx.status = 200;
                ctx.body = { msg: 'none', users: findUser };
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
 *  @GET '/user/delete?id=?'
 *  @会长删除成员
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
            const delUser = await ctx.db.query(
                "delete from user where id = ? and role =0",
                [remove_id]
            );
            if (delUser.affectedRows > 0) {
                ctx.state = 200;
                ctx.body = { msg: "删除成功" };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: '崩了' };
    }
});


/**
 *  @GET '/user/set'
 *  @会长设置成员职位
 *  param id
 *  @接口是私密的
 */
router.get('/set', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const set_id = ctx.query.id;
            const position = ctx.query.position;
            // 设置操作
            const delUser = await ctx.db.query(
                "update user set position=? where id = ?",
                [position, set_id]
            );
            if (delUser.affectedRows > 0) {
                ctx.state = 200;
                ctx.body = { msg: "设置成功" };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: '崩了' };
    }
});


/**
 *  @GET '/user/edit'
 *  @修改个人信息
 *  param id
 *  @接口是私密的
 */
router.get('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const edit_id = ctx.query.id;
            // 找到要修改的信息并将旧的内容返回到前台
            const findUser = await ctx.db.query(
                "select * from user where id = ?",
                [edit_id]
            );
            if (findUser) {
                ctx.status = 200;
                ctx.body = findUser;
            } else {
                ctx.status = 500;
                ctx.body = { msg: "你要查看的用户不存在或已被删除" };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: '崩了' };
    }
});


/**
 *  @POST 'user/edit'
 *  @编辑用户信息接口，接口是私密的
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
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
            const newUser = [
                data.id,
                data.name,
                data.phone,
                data.sex,
                data.position,
                data.college,
                data.class,
                data.id
            ];
            //添加到数据库
            try {
                const savaUser = await ctx.db.query(
                    "update user set id=?,name=?,phone=?,sex=?,position=?,college=?,class=? where id = ?",
                    newUser
                );
                if (savaUser.affectedRows > 0) {
                    ctx.status = 200;
                    ctx.body = { msg: "修改信息成功" };
                }
            } catch (e) {
                ctx.status = 500;
                ctx.body = { msg: "崩了" };
                console.log(e);
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
    }
});



/**
 *  @POST 'user/pwd'
 *  @修改密码，私密接口
 */
router.post('/pwd', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        
        if (user.length > 0) {
            //接收表单数据
            const data = ctx.request.body;
            // 验证密码
            if (md5(data.old) == user[0].password) {
                const items = [
                    md5(data.password1),
                    ctx.state.user.id
                ];
                // 密码对，修改密码
                try {
                    const savaUser = await ctx.db.query(
                        "update user set password=? where id = ?",
                        items
                    );
                    if (savaUser.affectedRows > 0) {
                        ctx.status = 200;
                        ctx.body = { msg: "修改密码成功" };
                    }
                } catch (e) {
                    ctx.status = 500;
                    ctx.body = { msg: "数据库错误" };
                    console.log(e);
                }
            } else {
                ctx.status = 201;
                ctx.body = { msg: '旧密码验证失败！' };
            }
            
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户不存在' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: "崩了" };
    }
});

module.exports = router.routes();
