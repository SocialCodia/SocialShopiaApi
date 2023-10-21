const orderService = require('../services/order-service');
const ErrorHandler = require('../utils/error-handler');
const Constants = require('../utils/constants');
const orderValidation = require('../validations/order-validation');
const cartService = require('../services/cart-service');
const addressService = require('../services/address-service');
const shippingAddressService = require('../services/shipping-address-service');
const couponService = require('../services/coupon-service');
const orderDetailService = require('../services/order-detail-service');
const OrderDto = require('../dtos/order-dto');
const mongoose = require('mongoose');

class OrderController {


    createOrder = async (req, res, next) => {
        let finalTotalPrice = 0;
        let finalTotalDiscountPrice = 0;
        let productDiscount = 0;
        let couponDiscount = 0;
        const body = await orderValidation.createOrder.validateAsync(req.body);

        const address = await addressService.findAddressMiny({ _id: body.addressId, userId: req.user.id });
        if (!address)
            return next(ErrorHandler.notFound('Address Not Found'));
        const sAdd = {
            userId: address.userId,
            address: address.address,
            type: address.type,
            countryId: address.countryId,
            stateId: address.stateId,
            cityId: address.cityId,
            postalCode: address.postalCode,
            mobile: address.mobile,
        }
        const shippingAddress = await shippingAddressService.createShippingAddress(sAdd);
        if (!shippingAddress)
            return next(ErrorHandler.serverError('Failed To Store Shipping Address'));
        const cartItems = await cartService.findCarts({ userId: req.user.id });  // cart items
        if (!cartItems || cartItems.length < 1)
            return next(ErrorHandler.notFound('Cart Is Empty'));

        let orderDetails = [];

        for (let i = 0; i < cartItems.length; i++) {
            let product = cartItems[i].productId;
            let discount, discountType, discountPrice, totalDiscountPrice = 0;
            const totalPrice = product.price * cartItems[i].quantity;
            let attribute = cartItems[i].stockId.attributeId.name;
            let stockId = cartItems[i].stockId._id;
            if (product.discount) {
                discount = product.discount;
                discountType = product.discountType;
                if (product.discountType == Constants.DISCOUNT_TYPE_AMOUNT) {
                    discountPrice = product.price - product.discount;
                }
                else {
                    discountPrice = product.price - (product.price * product.discount) / 100;
                }
                totalDiscountPrice = discountPrice * cartItems[i].quantity;
            }
            finalTotalDiscountPrice = finalTotalDiscountPrice + totalDiscountPrice;
            finalTotalPrice = finalTotalPrice + totalPrice;
            orderDetails.push({
                userId: req.user.id,
                productId: product._id,
                orderId: '',
                quantity: cartItems[i].quantity,
                price: product.price,
                discount: product.discount,
                discountType: product.discountType,
                discountPrice: discountPrice,
                totalPrice: totalPrice,
                totalDiscountPrice: totalDiscountPrice,
                attribute: attribute,
                stockId: stockId,
            });
        }
        productDiscount = finalTotalPrice - finalTotalDiscountPrice;        //total discount on product
        if (body.couponId) {
            const coupon = await couponService.findCoupon({ _id: body.couponId, status: true, endDate: { $gt: Date.now() } });
            let couponDiscountAmount = 0;
            if (!coupon)
                return next(ErrorHandler.badRequest('Invalid Coupon'));
            console.log(coupon);
            if (coupon.type == 'amount') {
                couponDiscountAmount = coupon.discount;
            }
            else if (coupon.type == 'percent') {
                couponDiscountAmount = Math.abs(finalTotalDiscountPrice - (coupon.discount / 100) * finalTotalDiscountPrice - finalTotalDiscountPrice);
            }
            finalTotalDiscountPrice = finalTotalDiscountPrice - couponDiscountAmount;
            couponDiscount = couponDiscountAmount;
        }
        const order = {
            userId: req.user.id,
            shippingId: shippingAddress._id,
            paymentMethodId: body.paymentMethodId,
            paymentStatus: 'unpaid',
            status: 'pending',
            note: body.note,
            totalAmount: finalTotalPrice,
            payableAmount: finalTotalDiscountPrice,
            code: orderService.getNewOrderNumber(),
            productDiscount,
            couponDiscount,
            couponId: body.couponId,
            shippingCost: '0',
        };
        const orderResult = await orderService.createOrder(order);
        if (!orderResult)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_ADD_FAILED));

        orderDetails.map((x) => x.orderId = orderResult._id);   //binding order id in order details
        const orderDetailResult = await orderDetailService.createOrderDetail(orderDetails);
        if (!orderDetailResult)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_ADD_FAILED));

        await cartService.deleteCarts({ userId: req.user.id });

        res.json({ success: true, message: Constants.MESSAGE_ORDER_ADDED });
    }

    findOrders = async (req, res, next) => {
        const { status, payment } = req.params;
        let { page } = req.query;
        page = page < 1 ? 1 : page;
        let filter = {};
        switch (status) {
            case Constants.ORDER_TYPE_PENDING:
                filter = { status: Constants.ORDER_TYPE_PENDING };
                break;
            case Constants.ORDER_TYPE_CONFIRMED:
                filter = { status: Constants.ORDER_TYPE_CONFIRMED };
                break;
            case Constants.ORDER_TYPE_PROCESSING:
                filter = { status: Constants.ORDER_TYPE_PROCESSING };
                break;
            case Constants.ORDER_TYPE_OUR_FOR_DELIVERY:
                filter = { status: Constants.ORDER_TYPE_OUR_FOR_DELIVERY };
                break;
            case Constants.ORDER_TYPE_RETURNED:
                filter = { status: Constants.ORDER_TYPE_RETURNED };
                break;
            case Constants.ORDER_TYPE_FAILED:
                filter = { status: Constants.ORDER_TYPE_FAILED };
                break;
            case Constants.ORDER_TYPE_CANCELED:
                filter = { status: Constants.ORDER_TYPE_CANCELED };
                break;
            case null:
                filter = {};
                break;
            case undefined:
                filter = {};
                break;
            default:
                return next(ErrorHandler.badRequest('Invalid Order Type'));
        }
        switch (payment) {
            case Constants.PAYMENT_STATUS_PAID:
                filter.paymentStatus = Constants.PAYMENT_STATUS_PAID;
                break;
            case Constants.PAYMENT_STATUS_UNPAID:
                filter.paymentStatus = Constants.PAYMENT_STATUS_UNPAID;
                break;
        }
        if (!req.user.type == Constants.USER_TYPE_ADMIN)
            filter.userId = req.user.id;
        const result = await orderService.findOrders(filter, page - 1);
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_NOT_FOUND));
        const data = result.map((x) => new OrderDto(x));
        res.json({ success: true, message: Constants.MESSAGE_ORDER_FOUND, data });
    }

    findOrder = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_ID_INVALID));
        const result = await orderService.findOrder({ _id: id });
        // return res.json({result});
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_ORDER_FOUND, data: new OrderDto(result) });
    }

    // updateOrder = async (req, res, next) => {
    //     const body = await orderValidation.updateOrder.validateAsync(req.body);
    //     const { id: _id } = body;
    //     delete body.id;
    //     const result = await orderService.updateOrder({ _id }, body);
    //     return (!result.matchedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_ORDER_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_ORDER_UPDATE });
    // }

    // deleteOrder = async (req, res, next) => {
    //     const body = await orderValidation.deleteOrder.validateAsync(req.body);
    //     const result = await orderService.deleteOrder({ _id: body.id });
    //     return (!result.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_ORDER_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_ORDER_DELETED });
    // }

}

module.exports = new OrderController();