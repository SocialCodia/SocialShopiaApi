const addressService = require('../services/address-service');
const Constants = require('../utils/constants');

class ShippingAddressController {

    createShippingAddress = async (req, res, next) => {

    }

    findShippingAddress = async (req,res,next) =>{
        
    }

    updateShippingAddress = async (req, res, next) => {

    }

    createShippingAddress = async (userId,addressId) =>{
        const address = await addressService.findAddress({userId,_id:addressId});
        if(!address)
            return Constants.MESSAGE_ADDRESS_NOT_FOUND;
        

    }

}

module.exports = new ShippingAddressController();