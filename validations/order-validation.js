const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class OrderValidation {

    createOrder = Joi.object({
        addressId: Joi.objectId().required(),
        paymentMethodId: Joi.objectId().required(),
        couponId: Joi.objectId(),
        note: Joi.string().max(1000),
    });


    updateOrder = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(2).max(30),
    });

}

module.exports = new OrderValidation();