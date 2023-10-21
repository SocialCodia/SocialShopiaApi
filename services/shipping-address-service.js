const ShippingAddressModel = require('../models/shipping-address-model');

class ShippingAddressService {

    createShippingAddress = async data => ShippingAddressModel.create(data);

    findShippingAddress = async filter => ShippingAddressModel.findOne(filter);

    updateShippingAddress = async (filter, data) => ShippingAddressModel.updateOne(filter, data);
}

module.exports = new ShippingAddressService();