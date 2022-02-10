const productService = require('../services/product-service');
const productValidation = require('../validations/product-validation');
const productStockService = require('../services/product-stock-service');
const ErrorHandler = require('../utils/error-handler');
const ProductDto = require('../dtos/product-dto');
const mongoose = require('mongoose');
const Constants = require('../utils/constants');

class ProductControlelr {

    createProduct = async (req, res, next) => {
        let stock = [];
        const body = await productValidation.createProduct.validateAsync(req.body);
        if (!body.slug)
            body.slug = body.name.replace(/\s+/g, '-').toLowerCase();
        else
            body.slug = body.slug.replace(/\s+/g, '-').toLowerCase();

        if (body.attributeIds.length != body.attributePrices.length || body.attributeIds.length != body.attributeQuantities.length)
            return next(ErrorHandler.badRequest('Attribute Price & Quantity Is Required'));

        for (let i = 0; i < body.attributeIds.length; i++) {
            stock.push({
                attributeId: body.attributeIds[i],
                price: body.attributePrices[i],
                quantity: body.attributeQuantities[i]
            });
        }
        const productStock = await productStockService.createProductStocks(stock);

        console.log(productStock);

        if (!productStock || productStock.length < 1)
            return next(ErrorHandler.serverError('Failed To Add Product'));

        body.stockIds = productStock.map((x) => {
            return x._id;
        })

        const product = await productService.createProduct(body);

        if (!product)
            return next(ErrorHandler.serverError('Failed To Add Product'));

        res.json({ success: true, message: 'Product Added' });
    }
    findProduct = async (req, res, next) => {
        const { id } = req.params;
        let filter = { _id: id };
        if (!mongoose.isValidObjectId(id))
            filter = { slug: id };
        const result = await productService.findProduct(filter);
        if (!result)
            return next(ErrorHandler.serverError('No Product Found'));
        res.json({ success: true, message: 'Products Found', data: new ProductDto(result) });
    }

    findProducts = async (req, res, next) => {
        const { type } = req.params;
        let filter = {};
        if (type && type == 'featured')
            filter.featured = true;
        else if (type && type == 'todaysdeal')
            filter.todaysDeal = true;

        if (!req.user || !req.user.type == Constants.USER_TYPE_ADMIN)
            filter.publish = true;

        console.log(filter);
        const result = await productService.findProducts(filter);
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError('No Product Found'));
        const data = result.map((x) => new ProductDto(x));
        res.json({ success: true, message: 'Products Found', data });
    }

    updateProduct = async (req, res, next) => {
        const body = await productValidation.updateProduct.validateAsync(req.body);
        const result = await productService.updateProduct({ _id: body.id }, body);
        console.log(body);
        res.json(result);
    }

    deleteProduct = async (req, res, next) => {
        const body = await productValidation.deleteProduct.validateAsync(req.body);
        const deletedProduct = await productService.findProductAndDelete({ _id: body.id });
        if (!deletedProduct)
            return next(ErrorHandler.notFound('Product Not Found'));
        const stockIds = deletedProduct.stockIds.map((x) => x);
        const isStockDeleted = await productStockService.deleteProductStocks({ _id: { $in: stockIds } });
        return (!isStockDeleted.deletedCount > 0) ? next(ErrorHandler.notFound('Product Not Found')) : res.json({ success: true, message: 'Product Deleted Successfully' });
    }



}

module.exports = new ProductControlelr();