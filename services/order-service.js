const OrderModel = require('../models/order-model');
const crypto = require('crypto');

class OrderService {

    createOrder = async data => await OrderModel.create(data);

    findOrder = async filter => await OrderModel.findOne(filter)
        .populate({
            path: 'shippingId paymentMethodId couponId'
        })
        .populate({
            path: 'shippingId',
            populate: {
                path: 'countryId stateId cityId'
            }
        })
        .populate({
            path: 'paymentMethodId',
            populate: {
                path: 'logo'
            }
        });

    findOrders = async (filter, page) => await OrderModel.find(filter)
        .skip(page * process.env.PER_PAGE_ORDERS_LIMIT)
        .limit(process.env.PER_PAGE_ORDERS_LIMIT)
        .select({ shippingId: 0, paymentMethodId: 0, couponId: 0 });

    updateOrder = async (filter, data) => await OrderModel.updateOne(filter, data);

    getNewOrderNumber = () => {
        const orderNumber = process.env.ORDER_NUMBER_PREFIX + "-" + crypto.randomInt(10000, 99999) + "-" + crypto.randomInt(10000, 99999) + "-" + crypto.randomInt(10000, 99999);
        return orderNumber;
    }

    // deleteOrder = async filter => await ModelOrder.deleteOne(filter);

}

module.exports = new OrderService();