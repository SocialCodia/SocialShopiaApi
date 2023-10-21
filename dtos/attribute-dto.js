
class AttributeDto {

    id;
    name;
    type;

    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.type = data.type
    }

}

module.exports = AttributeDto;