const cartService = require('../services/cart-service');
const cartValidation = require('../validations/cart-validation');
const ErrorHandler = require('../utils/error-handler');
const CartDto = require('../dtos/cart-dto');
const mongoose = require('mongoose');
const Constants = require('../utils/constants');

class CartController {

    createCart = async (req, res, next) => {
        let cart;
        const body = await cartValidation.createCart.validateAsync(req.body);
        body.userId = req.user.id;
        const cartItem = await cartService.findCart({ userId: req.user.id, productId: body.productId, stockId: body.stockId });
        console.log(cartItem);
        if (!cartItem)
            cart = await cartService.createCart(body);
        else
            cart = await cartService.updateCart({ productId: body.productId, userId: req.user.id, stockId: body.stockId }, { quantity: cartItem.quantity + 1 });
        if (!cart)
            return next(ErrorHandler.serverError(Constants.MESSAGE_CART_ADD_FAILED));
        res.json({ success: true, message: Constants.MESSAGE_CART_ADDED });
    }

    findCarts = async (req, res, next) => {
        const carts = await cartService.findCarts({ userId: req.user.id });
        if (!carts || carts.length < 1)
            return next(ErrorHandler.notFound(Constants.MESSAGE_CART_NOT_FOUND));
        const data = carts.map((x) => {
            return new CartDto(x);
        });
        res.json({ success: true, message: Constants.MESSAGE_CART_FOUND, data });
    }

    // NOT DECIDED YET 
    findCart = async (req, res, next) => {
        const { id } = req.params;
        let filter = { _id: id };
        if (!mongoose.isValidObjectId(id))
            filter = { slug: id };
        const cart = await cartService.findCart(filter);
        if (!cart)
            return next(ErrorHandler.notFound(Constants.MESSAGE_CART_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_CART_FOUND, data: new CartDto(Cart) });
    }

    updateCarts = async (req, res, next) => {
        const body = await cartValidation.updateCarts.validateAsync(req.body);
        if (body.id.length != body.quantity.length)
            return next(ErrorHandler.badRequest('Something went wrong!'));
        let cart;
        for (let i = 0; i < body.id.length; i++) {
            const a = body.id[i];
            const b = body.quantity[i];
            cart = await cartService.updateCart({ _id: a }, { quantity: b });
        }
        return (!cart) ? next(ErrorHandler.notFound(Constants.MESSAGE_CART_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_CART_UPDATE });
    }

    updateCart = async (req, res, next) => {
        const body = await cartValidation.updateCart.validateAsync(req.body);
        if (body.id.length != body.quantity.length)
            return next(ErrorHandler.badRequest('Something went wrong!'));
        const cart = await cartService.updateCarts({ _id }, body);
        return (!cart.matchedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_CART_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_CART_UPDATE });
    }

    deleteCart = async (req, res, next) => {
        const body = await cartValidation.deleteCart.validateAsync(req.body);
        const cart = await cartService.deleteCart({ _id: body.id, userId: req.user.id });
        console.log(cart);
        return (!cart.deletedCount) ? next(ErrorHandler.notFound(Constants.MESSAGE_CART_NOT_FOUND)) : res.json({ success: true, message: Constants.MESSAGE_CART_DELETED });
    }

}

module.exports = new CartController();