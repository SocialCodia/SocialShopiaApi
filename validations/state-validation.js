const { string } = require("@hapi/joi");
const Joi = require("@hapi/joi");
Joi.objectId = require('joi-objectid')(Joi);

class StateValidation {

    createState = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        countryId: Joi.objectId().required()
    });

    updateState = Joi.object({
        id: Joi.objectId().required(),
        countryId: Joi.objectId(),
        name: Joi.string().min(3).max(20)
    });

    deleteState = Joi.object({
        id: Joi.objectId().required(),
    });

}

module.exports = new StateValidation();