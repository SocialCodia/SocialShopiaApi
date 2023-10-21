const ProductDto = require('./product-dto');

class OrderDetailDto{

    id;
    product;
    orderId;
    quantity;
    price;
    discount;
    discountType;
    discountPrice;
    totalPrice;
    totalDiscountPrice;
    attribute;


    constructor(data)
    {
        this.id = data._id;
        this.product = data.productId && new ProductDto(data.productId);
        // this.product = data.productId;
        this.orderId = data.orderId;
        this.quantity = data.quantity;
        this.price = data.price;
        this.discount = data.discount;
        this.discountType = data.discountType;
        this.discountPrice = data.discountPrice;
        this.totalPrice = data.totalPrice;
        this.totalDiscountPrice = data.totalDiscountPrice;
        this.attribute = data.attribute;
    }



}

module.exports =OrderDetailDto;