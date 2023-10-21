const categoryService = require('../services/category-service');
const categoryValidation = require('../validations/category-validation');
const CategoryDto = require('../dtos/category-dto');
const ErrorHandler = require('../utils/error-handler');
const mongoose = require('mongoose');

class CategoryController {

    createCategory = async (req, res, next) => {
        if (!req.body.slug)
            req.body.slug = req.body.name.replace(/\s+/g, '-').toLowerCase();
        else
            req.body.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
        const body = await categoryValidation.createCategory.validateAsync(req.body);
        const result = await categoryService.createCategory(body);
        if (!result)
            return next(ErrorHandler.serverError('Failed To Add Category'));
        res.json({ success: true, message: 'Category Added' })
    }

    findCategories = async (req, res, next) => {
        const { id } = req.params;
        let filter = { $exists: false };
        if (id && !mongoose.isValidObjectId(id))
            if (id == 'featured')
                filter.featured = true;
            else
                return next(ErrorHandler.badRequest('Invalid Category Id'));
        if (id)
            filter.id = id
        const result = await categoryService.findCategories(filter);
        if (!result || result.length < 1)
            return next(ErrorHandler.notFound('No Category Found'));
        const data = result.map((x) => new CategoryDto(x));
        res.json({ success: true, message: 'Categories Found', data });
    }

    findCategory = async (req, res, next) => {
        const { id } = req.params;
        let filter = { _id: id };
        if (!mongoose.isValidObjectId(id))
            filter = { slug: id };
        const result = await categoryService.findCategory(filter);
        if (!result)
            return next(ErrorHandler.notFound('No Category Found'));
        res.json({ success: true, message: 'Category Found', data: new CategoryDto(result) });
    }

    updateCategory = async (req, res, next) => {
        if (req.body.slug)
            req.body.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
        const body = await categoryValidation.updateCategory.validateAsync(req.body);
        const result = await categoryService.updateCategory({ _id: body.id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound('No Category Found')) : res.json({ success: true, message: "Category Updated" });
    }

    deleteCategory = async (req, res, next) => {
        const body = await categoryValidation.updateCategory.validateAsync(req.body);
        const result = await categoryService.deleteCategory({ _id: body.id });
        console.log(result);
        return (!result.deletedCount) ? next(ErrorHandler.notFound('No Category Found')) : res.json({ success: true, message: "Category Deleted" });
    }
}

module.exports = new CategoryController();