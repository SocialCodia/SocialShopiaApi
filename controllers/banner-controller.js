const bannerService = require('../services/banner-service');
const bannerValidation = require('../validations/banner-validation');
const ErrorHandler = require('../utils/error-handler');
const Constants = require('../utils/constants');
const BannerDto = require('../dtos/banner-dto');
const mongoose = require('mongoose');

class BannerController {

    createBanner = async (req, res, next) => {
        const body = await bannerValidation.createBanner.validateAsync(req.body);
        const result = await bannerService.createBanner(body);
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_BANNER_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_BANNER_ADDED });
    }

    findBanners = async (req, res, next) => {
        const result = await bannerService.findBanners(null);
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_BANNER_NOT_FOUND));
        const data = result.map((x) => new BannerDto(x));
        res.json({ success: true, message: Constants.MESSAGE_BANNER_FOUND, data });
    }

    findBanner = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError(Constants.MESSAGE_BANNER_ID_INVALID));
        const result = await bannerService.findBanner({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_BANNER_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_BANNER_FOUND, data: new BannerDto(result) });
    }

    updateBanner = async (req, res, next) => {
        const body = await bannerValidation.updateBanner.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await bannerService.updateBanner({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_BANNER_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_BANNER_UPDATE });
    }

    deleteBanner = async (req, res, next) => {
        const body = await bannerValidation.deleteBanner.validateAsync(req.body);
        const result = await bannerService.deleteBanner({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_BANNER_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_BANNER_DELETED });
    }

}

module.exports = new BannerController();