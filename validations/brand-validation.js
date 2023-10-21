const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class BrandValidation {

    createBrand = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        featured: Joi.boolean(),
        logo: Joi.objectId().required(),
        slug: Joi.string().min(3).max(100).lowercase(),
        metaTitle: Joi.string().min(3).required(),
        metaDescription: Joi.string().min(3).required()
    });

    updateBrand = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(2).max(30),
        featured: Joi.boolean(),
        logo: Joi.objectId(),
        slug: Joi.string().min(3).max(100).lowercase(),
        metaTitle: Joi.string().min(3),
        metaDescription: Joi.string().min(3)
    });

}

module.exports = new BrandValidation();