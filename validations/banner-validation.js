const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class BannerValidation {

    createBanner = Joi.object({
        title: Joi.string().min(3).max(200).required(),
        image: Joi.objectId().required(),
        type: Joi.string().valid('product', 'category').required(),
        status: Joi.boolean().default(true),
        productId: Joi.objectId(),
        categoryId: Joi.objectId(),
    });

    updateBanner = Joi.object({
        id: Joi.objectId().required(),
        title: Joi.string().min(3).max(200),
        image: Joi.objectId(),
        type: Joi.string().valid('product', 'category'),
        status: Joi.boolean(),
        productId: Joi.objectId(),
        categoryId: Joi.objectId(),
    });

    deleteBanner = Joi.object({
        id: Joi.objectId().required(),
    });

}

module.exports = new BannerValidation();