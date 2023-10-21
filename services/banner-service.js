const BannerModel = require('../models/banner-model');

class BannerService {

    createBanner = async data => await BannerModel.create(data);

    findBanner = async filter => await BannerModel.findOne(filter);

    findBanners = async (filter) => await BannerModel.find(filter);

    updateBanner = async (filter, data) => await BannerModel.updateOne(filter, data);

    deleteBanner = async (filter) => await BannerModel.deleteOne(filter);

}

module.exports = new BannerService();