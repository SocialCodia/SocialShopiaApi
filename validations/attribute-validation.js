const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class AttributeValidation {

    createAttribute = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        type: Joi.string().valid('size', 'color').required(),
    });


    updateAttribute = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(2).max(30),
        type: Joi.string().valid('size', 'color')
    });

    deleteAttribute = Joi.object({
        id: Joi.objectId().required(),
    });


}

module.exports = new AttributeValidation();