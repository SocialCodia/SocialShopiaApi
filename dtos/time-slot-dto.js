
class TimeSlotDto {

    id;
    startTime;
    endTime;

    constructor(data) {
        this.id = data._id;
        this.startTime = data.startTime;
        this.endTime = data.endTime
    }

}

module.exports = TimeSlotDto;