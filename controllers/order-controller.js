const orderService = require('../services/order-service');
const ErrorHandler = require('../utils/error-handler');
const Constants = require('../utils/constants');
const orderValidation = require('../validations/order-validation');
const cartService = require('../services/cart-service');
const addressService = require('../services/address-service');
const shippingAddressService = require('../services/shipping-address-service');

class OrderController {


    createOrder = async (req, res, next) => {
        let finalTotalPrice = 0;
        let finalTotalDiscountPrice = 0;
        const body = await orderValidation.createOrder.validateAsync(req.body);
        const address = await addressService.findAddressMiny({ _id: body.addressId, userId: req.user.id });
        delete address._id;
        const shippingAddress = await shippingAddressService.createShippingAddress(address);
        if (!address)
            return next(ErrorHandler.notFound('Address Not Found'));
        const cartItems = await cartService.findCarts({ userId: req.user.id });
        let orderDetails = [];
        for (let i = 0; i < cartItems.length; i++) {
            let product = cartItems[i].productId;
            let discount, discountType, discountPrice, totalDiscountPrice;
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
                orderId: 'Order Id',
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
        res.json({ orderDetails, finalTotalDiscountPrice, finalTotalPrice });
        // const result = await orderService.createOrder(body);
        // if (!result)
        //     return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_ADD_FAILED));
        // res.json({ success: true, message: Constants.MESSAGE_ORDER_ADDED });
    }

    // findOrders = async (req, res, next) => {
    //     const result = await orderService.findOrders(null);
    //     if (!result || result.length < 1)
    //         return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_NOT_FOUND));
    //     const data = result.map((x) => new OrderDto(x));
    //     res.json({ success: true, message: Constants.MESSAGE_ORDER_FOUND, data });
    // }

    // findOrder = async (req, res, next) => {
    //     const { id } = req.params;
    //     if (!mongoose.isValidObjectId(id))
    //         return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_ID_INVALID));
    //     const result = await orderService.findOrder({ _id: id });
    //     if (!result)
    //         return next(ErrorHandler.serverError(Constants.MESSAGE_ORDER_NOT_FOUND));
    //     res.json({ success: true, message: Constants.MESSAGE_ORDER_FOUND, data: new OrderDto(result) });
    // }

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