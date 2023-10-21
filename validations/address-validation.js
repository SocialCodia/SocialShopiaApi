const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class AddressValidation {

    createAddress = Joi.object({
        address: Joi.string().min(5).max(150).required(),
        type: Joi.string().default('home'),
        countryId: Joi.objectId().required(),
        stateId: Joi.objectId().required(),
        cityId: Joi.objectId().required(),
        postalCode: Joi.string().min(6).max(6).required(),
        mobile: Joi.string().min(10).max(13).required(),
        default: Joi.bool().default(false),
        longitude: Joi.string(),
        latitude: Joi.string(),
    });

    updateAddress = Joi.object({
        id: Joi.objectId().required(),
        address: Joi.string().min(5).max(150),
        type: Joi.string().default('home'),
        countryId: Joi.objectId(),
        stateId: Joi.objectId(),
        cityId: Joi.objectId(),
        postalCode: Joi.string().min(6).max(6),
        mobile: Joi.string().min(10).max(13),
        default: Joi.bool(),
        longitude: Joi.string(),
        latitude: Joi.string(),
    });

    deleteAddress = Joi.object({
        id: Joi.objectId().required()
    });

    makeAddressDefault = Joi.object({
        id: Joi.objectId().required()
    });

}

module.exports = new AddressValidation();