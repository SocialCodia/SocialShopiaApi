const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class CountryValidation {

    createCountry = Joi.object({
        code: Joi.string().min(2).max(3).uppercase().required(),
        name: Joi.string().min(3).max(20).required(),
    });

    updateCountry = Joi.object({
        id: Joi.objectId().required(),
        code: Joi.string().min(2).max(3).uppercase(),
        name: Joi.string().min(3).max(20),
    });

    deleteCountry = Joi.object({
        id: Joi.objectId().required(),
    });

}

module.exports = new CountryValidation();