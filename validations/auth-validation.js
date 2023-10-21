const Joi = require('@hapi/joi');


class AuthValidation {

    register = Joi.object({
        name: Joi.string().min(4).max(30).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).max(50).required()
    });

    verify = Joi.object({
        email: Joi.string().email().lowercase().required(),
        otp: Joi.number().min(100000).max(999999).required()
    });

    login = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).max(30).required()
    });

    forgot = Joi.object({
        email: Joi.string().lowercase().required()
    });

    reset = Joi.object({
        email: Joi.string().lowercase().required(),
        otp: Joi.number().min(100000).max(999999).required(),
        password: Joi.string().min(8).max(30).required()
    });

    facebook = Joi.object({
        userId: Joi.string().required(),
        accessToken: Joi.string().required()
    })

}


module.exports = new AuthValidation();