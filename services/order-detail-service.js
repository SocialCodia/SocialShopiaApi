const OrderDetailModel = require('../models/order-detail-model');

class OrderDetailService {

    createOrderDetail = async data => await OrderDetailModel.create(data);

    findOrderDetail = async filter => await OrderDetailModel.findOne(filter);

    findOrderDetails = async filter => await OrderDetailModel.find(filter)
        .populate({
            path: 'productId',
            select: { categoryId: 0, images: 0, stockIds: 0,metaTitle:0,metaDescription:0,metaImage:0 },
            populate: {
                path: 'thumbnail',
            },
        })
        .select({stockId:0})

    updateOrderDetail = async (filter, data) => await OrderDetailModel.updateOne(filter, data);
}

module.exports = new OrderDetailService();