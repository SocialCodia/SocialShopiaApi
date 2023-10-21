const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class WishlistValidation {

    createWishlist = Joi.object({
        productId: Joi.objectId().required(),
    });

    deleteWishlist = Joi.object({
        id: Joi.objectId().required(),
    });

}

module.exports = new WishlistValidation();