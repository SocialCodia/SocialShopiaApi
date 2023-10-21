const UploadDto = require('./upload-dto');
const ProductDto = require('./product-dto');

class BannerDto {
    id;
    product;

    constructor(data) {
        this.id = data._id;
        this.product = data.productId == null ? null : new ProductDto(data.productId);
    }

}

module.exports = BannerDto;