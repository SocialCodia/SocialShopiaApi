const OrderModel = require('../models/order-model');
const crypto = require('crypto');

class OrderService {

    createOrder = async data => await OrderModel.create(data);

    findOrder = async filter => await OrderModel.findOne(filter);

    findOrderss = async filter => await OrderModel.find(filter);

    updateOrder = async (filter, data) => await OrderModel.updateOne(filter, data);

    getNewOrderNumber = () => {
        const orderNumber = process.env.ORDER_NUMBER_PREFIX + "-" + crypto.randomInt(10000, 99999) + "-" + crypto.randomInt(10000, 99999) + "-" + crypto.randomInt(10000, 99999);
        return orderNumber;
    }

    // deleteOrder = async filter => await ModelOrder.deleteOne(filter);

}

module.exports = new OrderService();