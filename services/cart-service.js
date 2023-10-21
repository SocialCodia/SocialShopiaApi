const CartModel = require('../models/cart-model');

class CartService {

    createCart = async data => await CartModel.create(data);

    findCart = async filter => await CartModel.findOne(filter);

    findCarts = async (filter) => await CartModel.find(filter).populate({ path: 'stockId', populate: 'attributeId' }).populate({ path: 'productId', populate: [{ path: 'categoryId brandId thumbnail images stockIds metaImage' }, { path: 'categoryId', populate: { path: 'icon' } }, { path: 'brandId', populate: { path: 'logo' } }, { path: 'stockIds', populate: { path: 'attributeId' } }] });

    updateCart = async (filter, data) => await CartModel.updateOne(filter, data);

    updateCarts = async (cartIds, data) => await CartModel.update({ _id: { $in: cartIds } }, { $set: { quantity: data } },);

    deleteCart = async (filter) => await CartModel.deleteOne(filter);

    deleteCarts = async (filter) => await CartModel.deleteMany(filter);

}

module.exports = new CartService();