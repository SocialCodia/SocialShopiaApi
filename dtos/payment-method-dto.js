const UploadDto = require('./upload-dto');

class PaymentMethodDto {

    id;
    name;
    logo;
    status;

    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.logo = new UploadDto(data.logo).path;
        this.status = data.status;
    }

}

module.exports = PaymentMethodDto;