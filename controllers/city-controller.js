const cityService = require('../services/city-service');
const cityValidation = require('../validations/city-validation');
const ErrorHandler = require('../utils/error-handler');
const mongoose = require('mongoose');
const IdNameDto = require('../dtos/id-name-dto');

class CityController {

    createCity = async (req, res, next) => {
        const body = await cityValidation.createCity.validateAsync(req.body);
        const result = await cityService.createCity(body);
        return result ? next(ErrorHandler.responseSuccess('City Added')) : next(ErrorHandler.serverError('Failed To Add City'));
    }

    findCities = async (req, res, next) => {
        const { stateId } = req.params;
        if (!mongoose.isValidObjectId(stateId))
            return next(ErrorHandler.badRequest('Invalid State Id'));
        const cities = await cityService.findCities({ status: 1, stateId });
        if (!cities || cities.length < 1)
            return next(ErrorHandler.notFound('No City Found'));
        const data = cities.map((x) => new IdNameDto(x));
        res.json({ success: true, message: 'Cities Found', data });
    }

    findCity = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError('Invalid City Id'));
        const result = await cityService.findCity({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError('No City Found'));
        res.json({ success: true, message: 'City Found', data: new IdNameDto(result) });
    }

    updateCity = async (req, res, next) => {
        const body = await cityValidation.updateCity.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await cityService.updateCity({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound('No City Found')) : res.json({ success: true, message: "City Updated" });
    }

    deleteCity = async (req, res, next) => {
        const body = await cityValidation.deleteCity.validateAsync(req.body);
        const result = await cityService.deleteCity({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound('No City Found')) : res.json({ success: true, message: "City Deleted" });
    }

}

module.exports = new CityController();