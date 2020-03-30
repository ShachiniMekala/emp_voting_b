const Joi=require('@hapi/joi');

//registration validation

const registerValidation=(data)=>{
    const userSchema={
        name: Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(8).required(),
        position:Joi.string().max(50).required()
    };

   return Joi.validate(data,userSchema);
}

const loginValidation=(data)=>{
    const userSchema={
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(8).required()
    };

   return Joi.validate(data,userSchema);
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;