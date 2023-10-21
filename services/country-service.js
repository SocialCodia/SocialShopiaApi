const ModelCountry = require('../models/country-model');

class CountryService {

    createCountry = async data => await ModelCountry.create(data);

    findCountries = async filter => await ModelCountry.find(filter);

    findCountry = async filter => await ModelCountry.findOne(filter);

    updateCountry = async (filter, data) => await ModelCountry.updateOne(filter, data);

    deleteCountry = async filter => await ModelCountry.deleteOne(filter);

};

module.exports = new CountryService();