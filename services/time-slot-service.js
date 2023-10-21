const TimeSlotModel = require('../models/time-slot-model');

class TimeSlotService {

    createTimeSlot = async data => await TimeSlotModel.create(data);

    findTimeSlot = async filter => await TimeSlotModel.findOne(filter);

    findTimeSlots = async (filter) => await TimeSlotModel.find(filter);

    updateTimeSlot = async (filter, data) => await TimeSlotModel.updateOne(filter, data);

    deleteTimeSlot = async (filter) => await TimeSlotModel.deleteOne(filter);

}

module.exports = new TimeSlotService();