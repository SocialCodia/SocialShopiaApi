const Joi = require('@hapi/joi');

class UploadValidation {

    createUplaod = Joi.object({
        type: Joi.string().valid('product', 'brand', 'banner', 'profile', 'icon').required()
    });

}

module.exports = new UploadValidation();