const CouponModel = require('../models/coupon-model');

class CouponService {

    createCoupon = async data => CouponModel.create(data);

    findCoupons = async filter => CouponModel.find(filter);

    findCoupon = async filter => CouponModel.findOne(filter);

    updateCoupon = async (filter, data) => await CouponModel.updateOne(filter, data);

    deleteCoupon = async filter => await CouponModel.deleteOne(filter);

}

module.exports = new CouponService();