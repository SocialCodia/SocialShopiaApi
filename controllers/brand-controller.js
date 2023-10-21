const brandService = require('../services/brand-service');
const brandValidation = require('../validations/brand-validation');
const ErrorHandler = require('../utils/error-handler');
const BrandDto = require('../dtos/brand-dto');
const mongoose = require('mongoose');

class BrandController {

    createBrand = async (req, res, next) => {
        const body = await brandValidation.createBrand.validateAsync(req.body);
        if (!body.slug)
            body.slug = body.name.replace(/\s+/g, '-').toLowerCase();
        else
            body.slug = body.slug.replace(/\s+/g, '-').toLowerCase()
        const brand = await brandService.createBrand(body);
        if (!brand)
            return next(ErrorHandler.serverError('Failed To Add Brand'));
        res.json({ success: true, message: 'Brand Added' });
    }

    findBrands = async (req, res, next) => {
        const brands = await brandService.findBrands();
        if (!brands || brands.length < 1)
            return next(ErrorHandler.notFound('No Brand Found'));
        const data = brands.map((x) => {
            return new BrandDto(x);
        });
        res.json({ success: true, message: 'Brands Found', data });
    }

    findBrand = async (req, res, next) => {
        const { id } = req.params;
        let filter = { _id: id };
        if (!mongoose.isValidObjectId(id))
            filter = { slug: id };
        const brand = await brandService.findBrand(filter);
        if (!brand)
            return next(ErrorHandler.notFound('No Brand Found'));
        console.log(brand);
        res.json({ success: true, message: 'Brands Found', data: new BrandDto(brand) });
    }

    updateBrand = async (req, res, next) => {
        const body = await brandValidation.updateBrand.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const brand = await brandService.updateBrand({ _id }, body);
        return (!brand.matchedCount) ? next(ErrorHandler.notFound('No Brand Found')) : res.json({ success: true, message: "Brand Updated" });
    }

    deleteBrand = async (req, res, next) => {
        const { id } = req.body;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.notFound('Invalid Brand Id'));
        const brand = await brandService.deleteBrand({ _id: id });
        console.log(brand);
        return (!brand.deletedCount) ? next(ErrorHandler.notFound('No Brand Found')) : res.json({ success: true, message: "Brand Deleted" });
    }

}

module.exports = new BrandController();