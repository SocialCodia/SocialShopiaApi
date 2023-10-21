const Joi = require("@hapi/joi");
Joi.objectId = require('joi-objectid')(Joi);

class CityValidation {
    createCity = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        stateId: Joi.objectId().required(),
        cost: Joi.number().min(1).max(5000).optional()
    });

    updateCity = Joi.object({
        id: Joi.objectId().required(),
        stateId: Joi.objectId(),
        name: Joi.string().min(3).max(20),
        cost: Joi.string().min(2).max(3).uppercase(),
    });

    deleteCity = Joi.object({
        id: Joi.objectId().required(),
    });
}

module.exports = new CityValidation();