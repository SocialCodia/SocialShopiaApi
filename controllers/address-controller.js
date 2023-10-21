const AddressDto = require('../dtos/address-dto');
const addressService = require('../services/address-service');
const ErrorHandler = require('../utils/error-handler');
const addressValidation = require('../validations/address-validation');
const Constants = require('../utils/constants');

class AddressController {

    createAddress = async (req, res, next) => {
        const body = await addressValidation.createAddress.validateAsync(req.body);
        body.userId = req.user.id;
        const address = await addressService.createAddress(body);
        if (!address)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ADDRESS_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_ADDRESS_ADDED });
    }

    findAddresses = async (req, res, next) => {
        const address = await addressService.findAddresses({ userId: req.user.id });
        if (!address || address.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ADDRESS_NOT_FOUND));
        const data = address.map((x) => new AddressDto(x));
        res.json({ success: true, message: Constants.MESSAGE_ADDRESS_FOUND, data });
    }

    findAddress = async (req, res, next) => {
        const { id } = req.params;
        const address = await addressService.findAddress({ _id: id, userId: req.user.id });
        if (!address)
            return next(ErrorHandler.serverError(Constants.MESSAGE_ADDRESS_NOT_FOUND));
        console.log(address);
        res.json({ success: true, message: Constants.MESSAGE_ADDRESS_FOUND, data: new AddressDto(address) });
    }

    updateAddress = async (req, res, next) => {
        const body = await addressValidation.updateAddress.validateAsync(req.body);
        const filter = { _id: body.id, userId: req.user.id };
        delete body.id;
        const address = await addressService.findAddressAndUpdate(filter, body);
        return (address) ? res.json({ success: true, message: Constants.MESSAGE_ADDRESS_UPDATED }) : next(ErrorHandler.serverError(Constants.MESSAGE_ADDRESS_NOT_FOUND));
    }

    deleteAddresss = async (req, res, next) => {
        const body = await addressValidation.deleteAddress.validateAsync(req.body);
        const address = await addressService.deleteAddress({ userId: req.user.id, _id: body.id });
        return (address.deletedCount) ? res.json({ success: true, message: Constants.MESSAGE_ADDRESS_DELETED }) : next(ErrorHandler.serverError(Constants.MESSAGE_ADDRESS_NOT_FOUND));
    }

    makeAddressDefault = async (req, res, next) => {
        const body = await addressValidation.makeAddressDefault.validateAsync(req.body);
        await addressService.updateAllAddress({ userId: req.user.id }, { default: false });
        await addressService.findAddressAndUpdate({ _id: body.id }, { default: true });
        return res.json({ success: true, message: Constants.MESSAGE_ADDRESS_UPDATED });
    }

}

module.exports = new AddressController();