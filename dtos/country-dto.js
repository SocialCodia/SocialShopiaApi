
class CountryDto {
    id;
    name;

    constructor(data) {
        this.id = data._id;
        this.name = data.name;
    }

}

module.exports = CountryDto;