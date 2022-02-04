const ProductDto = require('./product-dto');
const ProductStockDto = require('./product-stock-dto');

class CartDto {

    id;
    quantity
    choiceOption;
    product;

    constructor(data) {
        this.id = data.id;
        this.choiceOption = data.choiceOption && new ProductStockDto(data.stockId);
        this.quantity = data.quantity;
        this.product = data.productId && new ProductDto(data.productId);
    }

}

module.exports = CartDto;