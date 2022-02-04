const ModelAddress = require('../models/address-model');

class addressService {

    createAddress = async data => await ModelAddress.create(data);

    findAddresses = async filter => await ModelAddress.find(filter).populate({ path: 'countryId stateId cityId' });

    findAddress = async filter => await ModelAddress.findOne(filter).populate({ path: 'countryId stateId cityId' });

    findAddressMiny = async filter => await ModelAddress.findOne(filter);

    findAddressAndUpdate = async (filter, data) => await ModelAddress.findOneAndUpdate(filter, data);

    updateAllAddress = async (filter, data) => await ModelAddress.updateMany(filter, data);

    deleteAddress = async (filter) => await ModelAddress.deleteOne(filter);

}

module.exports = new addressService();