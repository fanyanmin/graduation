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
        data.id = !isEmpty(data.id)?data.id:'';

        if(!Validator.isLength(data.id.toString(),{max:10})){
            errors.msg = '学号最长为10位！';
        }

        return{
            errors,
            isValid: isEmpty(errors)
        }
    },

    // 注册验证
    RegisterValid:(data)=>{
        const errors = {};
        
        data.id = !isEmpty(data.id)?data.id:'';
        data.name = !isEmpty(data.name)?data.name:'';

        if(!Validator.isLength(data.id.toString(),{max:10})){
            errors.msg = '学号最长为10位！';
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