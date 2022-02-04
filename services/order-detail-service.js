const OrderDetailModel = require('../models/order-detail-model');

class OrderDetailService {

    createOrderDetail = async data => await OrderDetailModel.create(data);

    findOrderDetail = async filter => await OrderDetailModel.findOne(filter);

    updateOrderDetail = async (filter, data) => await OrderDetailModel.updateOne(filter, data);
}

module.exports = new OrderDetailService();