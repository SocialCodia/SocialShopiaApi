const attributeService = require('../services/attribute-service');
const attributeValidation = require('../validations/attribute-validation');
const AttributeDto = require('../dtos/attribute-dto');
const ErrorHandler = require('../utils/error-handler');
const mongoose = require('mongoose');
const Constants = require('../utils/constants');

class AttributeController {

    createAttribute = async (req, res, next) => {
        const body = await attributeValidation.createAttribute.validateAsync(req.body);
        const result = await attributeService.createAttribute(body);
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ATTRIBUTE_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_ATTRIBUTE_ADDED });
    }

    findAttributes = async (req, res, next) => {
        const result = await attributeService.findAttributes(null);
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ATTRIBUTE_NOT_FOUND));
        const data = result.map((x) => new AttributeDto(x));
        res.json({ success: true, message: Constants.MESSAGE_ATTRIBUTE_FOUND, data });
    }

    findAttribute = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError(Constants.MESSAGE_ATTRIBUTE_ID_INVALID));
        const result = await attributeService.findAttribute({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ATTRIBUTE_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_ATTRIBUTE_FOUND, data: new AttributeDto(result) });
    }

    updateAttribute = async (req, res, next) => {
        const body = await attributeValidation.updateAttribute.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await attributeService.updateAttribute({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_ATTRIBUTE_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_ATTRIBUTE_UPDATE });
    }

    deleteAttribute = async (req, res, next) => {
        const body = await attributeValidation.deleteAttribute.validateAsync(req.body);
        const result = await attributeService.deleteAttribute({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_ATTRIBUTE_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_ATTRIBUTE_DELETED });
    }

}

module.exports = new AttributeController();