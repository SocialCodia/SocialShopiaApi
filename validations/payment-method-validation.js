const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class PaymentMethodValidation {

    createPaymentMethod = Joi.object({
        name: Joi.string().min(2).max(70).required(),
        logo: Joi.objectId().required(),
        status: Joi.bool().default(false)
    });

    updatePaymentMethod = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(2).max(70),
        logo: Joi.objectId(),
        status: Joi.boolean()
    });

    deletePaymentMethod = Joi.object({
        id: Joi.objectId().required(),
    });


}

module.exports = new PaymentMethodValidation();