const countryService = require('../services/country-service');
const countryValidation = require('../validations/country-validation');
const ErrorHandler = require('../utils/error-handler');
const CountryDto = require('../dtos/country-dto');
const mongoose = require('mongoose');

class CountryController {

    createCountry = async (req, res, next) => {
        const body = await countryValidation.createCountry.validateAsync(req.body);
        const result = await countryService.createCountry(body);
        return result ? next(ErrorHandler.responseSuccess('Country Added')) : next(ErrorHandler.serverError('Failed To Add Country'));
    }

    findCountries = async (req, res, next) => {
        const countries = await countryService.findCountries({ status: 1 });
        if (!countries)
            return next(ErrorHandler.responseSuccess('No Country Found'));
        const data = countries.map((x) => new CountryDto(x));
        res.json({ success: true, message: 'Countries Found', data })
    }

    findCountry = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError('Invalid Country Id'));
        const result = await countryService.findCountry({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError('No Country Found'));
        res.json({ success: true, message: 'Country Found', data: new CountryDto(result) });
    }

    updateCountry = async (req, res, next) => {
        const body = await countryValidation.updateCountry.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await countryService.updateCountry({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound('No Country Found')) : res.json({ success: true, message: "Country Updated" });
    }

    deleteCountry = async (req, res, next) => {
        const body = await countryValidation.deleteCountry.validateAsync(req.body);
        const result = await countryService.deleteCountry({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound('No Country Found')) : res.json({ success: true, message: "Country Deleted" });
    }

}

module.exports = new CountryController();