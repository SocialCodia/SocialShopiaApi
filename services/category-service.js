const ModelCategory = require('../models/category-model');

class CategoryService {

    createCategory = async data => await ModelCategory.create(data);

    findCategory = async filter => await ModelCategory.findOne(filter).populate('banner').populate('icon');

    findCategories = async filter => await ModelCategory.find(filter).populate('icon').populate('banner');

    updateCategory = async (filter, data) => await ModelCategory.updateOne(filter, data);

    deleteCategory = async filter => await ModelCategory.deleteOne(filter);

}

module.exports = new CategoryService();