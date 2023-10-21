const OrderDetailDto = require('../dtos/order-detail-dto');
const orderDetailService = require('../services/order-detail-service');
const Constants = require('../utils/constants');
const ErrorHandler = require('../utils/error-handler');

class OrderDetailController {

    findOrderDetail = async (req, res, next) => {
        const { id } = req.params;
        let filter = { orderId: id };
        if (!req.user.type == Constants.USER_TYPE_ADMIN)
            filter.userId = req.user.id;
        const result = await orderDetailService.findOrderDetails(filter);
        if (!result || result.length < 1)
            return next(ErrorHandler.notFound('No Items Found'));
        const data = result.map((x) => new OrderDetailDto(x));
        res.json({ success: true, message: 'Order Items Found', data });
    }

}

module.exports = new OrderDetailController();