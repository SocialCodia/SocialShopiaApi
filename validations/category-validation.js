const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class CategoryValidation {
    createCategory = Joi.object({
        parentId: Joi.objectId(),
        name: Joi.string().min(3).max(100).required(),
        banner: Joi.objectId(),
        icon: Joi.objectId().required(),
        featured: Joi.boolean().default(false),
        slug: Joi.string().lowercase().min(3).max(100),
        metaTitle: Joi.string().min(3).max(300).required(),
        metaDescription: Joi.string().min(10).max(2000).required()
    });

    updateCategory = Joi.object({
        id:Joi.objectId().required(),
        parentId: Joi.objectId(),
        name: Joi.string().min(3).max(100),
        banner: Joi.objectId(),
        icon: Joi.objectId(),
        featured: Joi.boolean(),
        slug: Joi.string().lowercase().min(3).max(100),
        metaTitle: Joi.string().min(3).max(300),
        metaDescription: Joi.string().min(10).max(2000)
    });

    deleteCategory = Joi.object({
        id:Joi.objectId().required(),
    });



}

module.exports = new CategoryValidation();