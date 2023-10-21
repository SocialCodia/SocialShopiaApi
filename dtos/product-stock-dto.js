const AttributeDto = require('../dtos/attribute-dto');

class ProductStockDto {
    id;
    price;
    quantity;
    attribute;

    constructor(data) {
        this.id = data._id;
        this.price = data.price;
        this.quantity = data.quantity;
        this.attribute = data.attributeId == null ? null : new AttributeDto(data.attributeId);
    }
}

module.exports = ProductStockDto;