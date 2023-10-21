const UploadDto = require('./upload-dto');

class BannerDto {
    id;
    title;
    image;
    type;
    status;
    productId;
    categoryId;

    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.image = data.image == null ? null : new UploadDto(data.image).path;
        this.type = data.type;
        this.status = data.status;
        this.productId = data.productId;
        this.categoryId = data.categoryId;
    }

}

module.exports = BannerDto;