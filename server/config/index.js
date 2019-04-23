
module.exports = {
    TOKEN_KEY:'hjka^!!@_%$^sgfhjgfav_fkjdfh^&688*6}{6876',
    APP_PORT:process.env.PORT||8081,
    SALT:'!@#$%^blog_salt',
    TOKEN_VALID_TIME:7200,      //token过期时间
    MYSQL:{
        host:"localhost",
        user:"root",
        password:"root",
        port:3306,
        database:"stu_group",
        timezone:"08:00"
    }
};