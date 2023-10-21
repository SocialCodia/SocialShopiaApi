const PaymentMethodModel = require('../models/payment-method-model');

class PaymentMethodService {

    createPaymentMethod = async data => await PaymentMethodModel.create(data);

    findPaymentMethod = async filter => await PaymentMethodModel.findOne(filter).populate('logo');

    findPaymentMethods = async (filter) => await PaymentMethodModel.find(filter).populate('logo');

    updatePaymentMethod = async (filter, data) => await PaymentMethodModel.updateOne(filter, data);

    deletePaymentMethod = async (filter) => await PaymentMethodModel.deleteOne(filter);

}

module.exports = new PaymentMethodService();