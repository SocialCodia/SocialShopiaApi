const IdNameDto = require('./id-name-dto');

class AddressDto {
    id;
    address;
    type;
    country;
    state;
    city;
    postalCode;
    mobile;
    default;

    constructor(data) {
        this.id = data._id;
        this.address = data.address;
        this.type = data.type;
        this.country = new IdNameDto(data.countryId);
        this.state = new IdNameDto(data.stateId);
        this.city = new IdNameDto(data.cityId);
        this.postalCode = data.postalCode;
        this.mobile = data.mobile;
        this.default = data.default;
    }

}

module.exports = AddressDto;