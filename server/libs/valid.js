const Validator = require('validator');

// 验证是否为空
const isEmpty = function(value){
    return (
        value == undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

module.exports = {
    // 登录验证
    loginValid:(data)=>{
        const errors = {};
        data.phone = !isEmpty(data.phone)?data.phone:'';

        if(!Validator.isMobilePhone(data.phone)){
            errors.phone = '请输入正确的手机号';
        }

        return{
            errors,
            isValid: isEmpty(errors)
        }
    },

    // 注册验证
    RegisterValid:(data)=>{
        const errors = {};

        data.phone = !isEmpty(data.phone)?data.phone:'';
        data.name = !isEmpty(data.name)?data.name:'';

        if(!Validator.isMobilePhone(data.phone)){
            errors.phone = '手机号格式错误！';
        }

        if(!Validator.isLength(data.name,{max:20})){
            errors.name = '姓名最好在20位以内哦';
        }

        return{
            errors,
            isValid: isEmpty(errors)
        }
    }
};