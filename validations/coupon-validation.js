const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class CouponValidation {

    createCoupon = Joi.object({
        title: Joi.string().min(3).max(300).required(),
        code: Joi.string().min(5).max(15).required().uppercase().trim(),
        discount: Joi.number().min(0).max(100).default(0),
        type: Joi.string().valid('percent', 'amount').default('percent'),
        minPurchase: Joi.number().min(0).required(),
        maxDiscount: Joi.number().min(0).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.boolean().default(true),
    });


    updateCoupon = Joi.object({
        id: Joi.objectId().required(),
        title: Joi.string().min(3).max(300),
        code: Joi.string().min(5).max(15).uppercase().trim(),
        discount: Joi.number().min(0).max(100),
        type: Joi.string().valid('percent', 'amount'),
        minPurchase: Joi.number().min(0),
        maxDiscount: Joi.number().min(0),
        startDate: Joi.date(),
        endDate: Joi.date(),
        status: Joi.boolean(),
    });

    deleteCoupon = Joi.object({
        id: Joi.objectId().required(),
    });


}

module.exports = new CouponValidation();