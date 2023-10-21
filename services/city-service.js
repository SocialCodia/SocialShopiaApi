const ModelCity = require('../models/city-model');

class CityService {

    createCity = async data => await ModelCity.create(data);

    findCities = async filter => await ModelCity.find(filter);

    findCity = async filter => await ModelCity.findOne(filter);

    updateCity = async (filter, data) => await ModelCity.updateOne(filter, data);

    deleteCity = async filter => await ModelCity.deleteOne(filter);

};

module.exports = new CityService();