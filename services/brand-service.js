const ModelBrand = require('../models/brand-model');

class BrandService {

    createBrand = async data => ModelBrand.create(data);

    findBrands = async filter => ModelBrand.find(filter).populate('logo');

    findBrand = async filter => ModelBrand.findOne(filter).populate('logo');

    updateBrand = async (filter, data) => await ModelBrand.updateOne(filter, data);

    deleteBrand = async filter => await ModelBrand.deleteOne(filter);



}

module.exports = new BrandService();