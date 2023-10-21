const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class TimeSlotValidation {

    createTimeSlot = Joi.object({
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        status: Joi.boolean().default(true)
    });


    updateTimeSlot = Joi.object({
        id: Joi.objectId().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        status: Joi.boolean().default(true)
    });

    deleteTimeSlot = Joi.object({
        id: Joi.objectId().required(),
    });


}

module.exports = new TimeSlotValidation();