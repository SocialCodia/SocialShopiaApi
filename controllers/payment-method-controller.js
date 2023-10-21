const paymentMethodService = require('../services/payment-method-service');
const paymentMethodValidation = require('../validations/payment-method-validation');
const ErrorHandler = require('../utils/error-handler');
const PaymentMethodDto = require('../dtos/payment-method-dto');
const mongoose = require('mongoose');

class PaymentMethodController {

    createPaymentMethod = async (req, res, next) => {
        const body = await paymentMethodValidation.createPaymentMethod.validateAsync(req.body);
        const result = await paymentMethodService.createPaymentMethod(body);
        return result ? res.json({ success: true, message: 'Payment Methods Found' }) : next(ErrorHandler.serverError('Failed To Add Payment Method'));
    }

    findPaymentMethods = async (req, res, next) => {
        const result = await paymentMethodService.findPaymentMethods({ status: true });
        if (!result || result.length < 1)
            return next(ErrorHandler.responseSuccess('No Payment Method Found'));
        const data = result.map((x) => new PaymentMethodDto(x));
        res.json({ success: true, message: 'Payment Method Found', data })
    }

    findPaymentMethod = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError('Invalid PaymentMethod Id'));
        const result = await paymentMethodService.findPaymentMethod({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError('No PaymentMethod Found'));
        res.json({ success: true, message: 'PaymentMethod Found', data: new PaymentMethodDto(result) });
    }

    updatePaymentMethod = async (req, res, next) => {
        const body = await paymentMethodValidation.updatePaymentMethod.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await paymentMethodService.updatePaymentMethod({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound('No PaymentMethod Found')) : res.json({ success: true, message: "PaymentMethod Updated" });
    }

    deletePaymentMethod = async (req, res, next) => {
        const body = await paymentMethodValidation.deletePaymentMethod.validateAsync(req.body);
        const result = await paymentMethodService.deletePaymentMethod({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound('No PaymentMethod Found')) : res.json({ success: true, message: "PaymentMethod Deleted" });
    }

}

module.exports = new PaymentMethodController();