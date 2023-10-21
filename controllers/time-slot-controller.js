const timeSlotService = require('../services/time-slot-service');
const timeSlotValidation = require('../validations/time-slot-validation');
const ErrorHandler = require('../utils/error-handler');
const Constants = require('../utils/constants');
const TimeSlotDto = require('../dtos/time-slot-dto');
const mongoose = require('mongoose');

class TimeSlotController {

    createTimeSlot = async (req, res, next) => {
        const body = await timeSlotValidation.createTimeSlot.validateAsync(req.body);
        const result = await timeSlotService.createTimeSlot(body);
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_TIME_SLOT_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_TIME_SLOT_ADDED });
    }

    findTimeSlots = async (req, res, next) => {
        const result = await timeSlotService.findTimeSlots(null);
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_TIME_SLOT_NOT_FOUND));
        const data = result.map((x) => new TimeSlotDto(x));
        res.json({ success: true, message: Constants.MESSAGE_TIME_SLOT_FOUND, data });
    }

    findTimeSlot = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError(Constants.MESSAGE_TIME_SLOT_ID_INVALID));
        const result = await timeSlotService.findTimeSlot({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_TIME_SLOT_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_TIME_SLOT_FOUND, data: new TimeSlotDto(result) });
    }

    updateTimeSlot = async (req, res, next) => {
        const body = await timeSlotValidation.updateTimeSlot.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await timeSlotService.updateTimeSlot({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_TIME_SLOT_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_TIME_SLOT_UPDATE });
    }

    deleteTimeSlot = async (req, res, next) => {
        const body = await timeSlotValidation.deleteTimeSlot.validateAsync(req.body);
        const result = await timeSlotService.deleteTimeSlot({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_TIME_SLOT_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_TIME_SLOT_DELETED });
    }

}

module.exports = new TimeSlotController();