const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class ProductValidation {

    createProduct = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        categoryId: Joi.objectId().required(),
        brandId: Joi.objectId().required(),
        images: Joi.array().items(Joi.objectId().required()).required(),
        thumbnail: Joi.objectId().required(),
        description: Joi.string().min(3).max(2000).required(),
        price: Joi.number().min(0).max(100000).required(),
        attributeIds: Joi.array().items(Joi.objectId().required()).required(),
        attributePrices: Joi.array().items(Joi.number().min(0).max(100000).required()).required(),
        attributeQuantities: Joi.array().items(Joi.number().min(0).max(100000).required()).required(),
        published: Joi.boolean().default(true),
        featured: Joi.boolean().default(false),
        todaysDeal: Joi.boolean().default(false),
        discount: Joi.number().min(0).max(100),
        discountType: Joi.string().valid('amount', 'percent'),
        discountStartDate: Joi.date(),
        discountEndDate: Joi.date(),
        metaTitle: Joi.string().min(3).max(300).required(),
        metaDescription: Joi.string().min(3).max(2000).required(),
        metaImage: Joi.objectId().required(),
        slug: Joi.string().min(3).max(500).lowercase(),
    });

    updateProduct = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(3).max(30),
        categoryId: Joi.objectId(),
        brandId: Joi.objectId(),
        images: Joi.array().items(Joi.objectId().required()),
        thumbnail: Joi.objectId(),
        description: Joi.string().min(3).max(2000),
        price: Joi.number().min().max(100000),
        attributeIds: Joi.array().items(Joi.objectId().required()),
        attributePrices: Joi.array().items(Joi.number().min(0).max(100000).required()),
        attributeQuantities: Joi.array().items(Joi.number().min(0).max(100000).required()),
        published: Joi.boolean(),
        featured: Joi.boolean(),
        todaysDeal: Joi.boolean(),
        discount: Joi.number().min(0).max(100),
        discountType: Joi.string().valid('amount', 'percent'),
        discountStartDate: Joi.date(),
        discountEndDate: Joi.date(),
        metaTitle: Joi.string().min(3).max(300),
        metaDescription: Joi.string().min(3).max(2000),
        metaImage: Joi.objectId(),
        slug: Joi.string().min(3).max(500).lowercase(),
    });

    deleteProduct = Joi.object({
        id: Joi.objectId().required(),
    });

}

module.exports = new ProductValidation();