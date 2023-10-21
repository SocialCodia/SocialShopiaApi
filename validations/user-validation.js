const Joi = require('@hapi/joi');

class UserValidation {

    updateUser = Joi.object({
        id: Joi.objectId(),
        name: Joi.string().min(4).max(30),
        email: Joi.string().email().lowercase(),
        password: Joi.string().min(8).max(50),
        status: Joi.string().min(3).max(50),
    });


}

module.exports = new UserValidation();