const wishlistService = require('../services/wishlist-service');
const wishlistValidation = require('../validations/wishlist-validation');
const ErrorHandler = require('../utils/error-handler');
const Constants = require('../utils/constants');
const WishlistDto = require('../dtos/wishlist-dto');

class WishlistController {

    createWishlist = async (req, res, next) => {
        const body = await wishlistValidation.createWishlist.validateAsync(req.body);
        body.userId = req.user.id;
        const result = await wishlistService.createWishlist(body);
        if (!result)
            return next(ErrorHandler.serverError(Constants.MESSAGE_WISHLIST_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_WISHLIST_ADDED });
    }

    findWishlists = async (req, res, next) => {
        const { id: userId } = req.user;
        const result = await wishlistService.findWishlists({ userId });
        if (!result || result.length < 1)
            return next(ErrorHandler.serverError(Constants.MESSAGE_WISHLIST_NOT_FOUND));
        const data = result.map((x) => new WishlistDto(x));
        res.json({ success: true, message: Constants.MESSAGE_WISHLIST_FOUND, data });
    }

    deleteWishlist = async (req, res, next) => {
        const body = await wishlistValidation.deleteWishlist.validateAsync(req.body);
        const result = await wishlistService.deleteWishlist({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_WISHLIST_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_WISHLIST_DELETED });
    }

}

module.exports = new WishlistController();