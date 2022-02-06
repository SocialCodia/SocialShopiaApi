const PaymentMethodDto = require('./payment-method-dto');
const ShippingAddressDto = require('./shipping-address-dto');
const CouponDto = require('./coupon-dto');

class OrderDto {
    id;
    shipping;
    paymentMethod;
    paymentStatus;
    status;
    note;
    code;
    totalAmount;
    payableAmount;
    couponDiscount;
    productDiscount;
    couponId;
    shippingCost;
    orderDate;

    constructor(data) {
        this.id = data._id;
        this.shipping = data.shippingId && new ShippingAddressDto(data.shippingId);
        this.paymentMethod = data.paymentMethodId && new PaymentMethodDto(data.paymentMethodId);
        this.paymentStatus = data.paymentStatus;
        this.status = data.status;
        this.note = data.note;
        this.code = data.code;
        this.totalAmount = data.totalAmount;
        this.payableAmount = data.payableAmount;
        this.couponDiscount = data.couponDiscount;
        this.productDiscount = data.productDiscount;
        this.coupon = data.couponId && new CouponDto(data.couponId);
        this.shippingCost = data.shippingCost;
        this.orderDate = data.orderDate;
    }


}

module.exports = OrderDto;