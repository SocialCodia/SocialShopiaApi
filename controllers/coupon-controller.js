const couponService = require('../services/coupon-service');
const couponValidation = require('../validations/coupon-validation');
const CouponDto = require('../dtos/coupon-dto');
const ErrorHandler = require('../utils/error-handler');
const mongoose = require('mongoose');
const Constants = require('../utils/constants');

class CouponController {

    createCoupon = async (req, res, next) => {
        const body = await couponValidation.createCoupon.validateAsync(req.body);
        const result = await couponService.createCoupon(body);
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_COUPON_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_COUPON_ADDED });
    }

    findCoupons = async (req, res, next) => {
        const type = req.path.split('/').pop();
        console.log(type);
        let filter = {};
        switch (type) {
            case 'active':
                filter = { status: true };
                break;
            case 'inactive':
                filter = { status: false };
                break;
            case 'expired':
                filter = { endDate: { $lt: Date.now() } };
                break;
            case 'coupons':
                filter = {};
                break;
            default:
                return next(ErrorHandler.badRequest('Invalid Coupon Type'));
        }
        console.log({ filter });
        const result = await couponService.findCoupons(filter);
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_COUPON_NOT_FOUND));
        const data = result.map((x) => new CouponDto(x));
        res.json({ success: true, message: Constants.MESSAGE_COUPON_FOUND, data });
    }

    findCoupon = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError(Constants.MESSAGE_COUPON_ID_INVALID));
        const result = await couponService.findCoupon({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_COUPON_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_COUPON_FOUND, data: new CouponDto(result) });
    }

    updateCoupon = async (req, res, next) => {
        const body = await couponValidation.updateCoupon.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await couponService.updateCoupon({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_COUPON_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_COUPON_UPDATE });
    }

    deleteCoupon = async (req, res, next) => {
        const body = await couponValidation.deleteCoupon.validateAsync(req.body);
        const result = await couponService.deleteCoupon({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_COUPON_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_COUPON_DELETED });
    }

}

module.exports = new CouponController();