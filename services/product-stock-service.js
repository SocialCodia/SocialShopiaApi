const ProductStockModel = require('../models/product-stock-model');

class ProductStockService {

    createProductStock = async data => await ProductStockModel.create(data);

    createProductStocks = async data => await ProductStockModel.insertMany(data);

    findProductStock = async filter => await ProductStockModel.findOne(filter);

    findProductStocks = async filter => await ProductStockModel.find(filter);

    updateProductStock = async (filter, data) => await ProductStockModel.updateOne(filter, data);

    deleteProductStock = async filter => await ProductStockModel.deleteOne(filter);

    deleteProductStocks = async filter => await ProductStockModel.deleteMany(filter);

}

module.exports = new ProductStockService();