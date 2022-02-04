const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class CartValidation {

    createCart = Joi.object({
        productId: Joi.objectId().required(),
        stockId: Joi.objectId().required(),
        quantity: Joi.number().min(1).max(1000).default(1)
    });

    updateCart = Joi.object({
        id: Joi.objectId().required(),
    });

    updateCarts = Joi.object({
        id: Joi.array().items(Joi.objectId().required()),
        quantity: Joi.array().items(Joi.number().required())
    });

    deleteCart = Joi.object({
        id: Joi.objectId().required(),

    });

}

module.exports = new CartValidation();