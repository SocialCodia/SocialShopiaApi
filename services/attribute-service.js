const AttributeModel = require('../models/attribute-model');

class AttributeService {

    createAttribute = async data => await AttributeModel.create(data);

    findAttribute = async filter => await AttributeModel.findOne(filter);

    findAttributes = async (filter) => await AttributeModel.find(filter);

    updateAttribute = async (filter, data) => await AttributeModel.updateOne(filter, data);

    deleteAttribute = async (filter) => await AttributeModel.deleteOne(filter);

}

module.exports = new AttributeService();