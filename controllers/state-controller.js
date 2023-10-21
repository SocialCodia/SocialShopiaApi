const stateService = require('../services/state-service');
const stateValidation = require('../validations/state-validation');
const ErrorHandler = require('../utils/error-handler');
const mongoose = require('mongoose');
const IdNameDto = require('../dtos/id-name-dto');

class StateController {

    createState = async (req, res, next) => {
        const body = await stateValidation.createState.validateAsync(req.body);
        const result = await stateService.createState(body);
        return result ? next(ErrorHandler.responseSuccess('State Added')) : next(ErrorHandler.serverError('Failed To Add State'));
    }

    findStates = async (req, res, next) => {
        const { countryId } = req.params;
        if (!mongoose.isValidObjectId(countryId))
            return next(ErrorHandler.badRequest('Invalid Country Id'));
        const states = await stateService.findStates({ status: 1, countryId });
        if (!states || states.length < 1)
            return next(ErrorHandler.notFound('No States Found'));
        const data = states.map((x) => new IdNameDto(x));
        res.json({ success: true, message: 'States Found', data });
    }

    findState = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return next(ErrorHandler.serverError('Invalid State Id'));
        const result = await stateService.findState({ _id: id });
        if (!result)
            return next(ErrorHandler.serverError('No State Found'));
        res.json({ success: true, message: 'State Found', data: new IdNameDto(result) });
    }

    updateState = async (req, res, next) => {
        const body = await stateValidation.updateState.validateAsync(req.body);
        const { id: _id } = body;
        delete body.id;
        const result = await stateService.updateState({ _id }, body);
        return (!result.matchedCount) ? next(ErrorHandler.notFound('No State Found')) : res.json({ success: true, message: "State Updated" });
    }

    deleteState = async (req, res, next) => {
        const body = await stateValidation.deleteState.validateAsync(req.body);
        const result = await stateService.deleteState({ _id: body.id });
        return (!result.deletedCount) ? next(ErrorHandler.notFound('No State Found')) : res.json({ success: true, message: "State Deleted" });
    }

}

module.exports = new StateController();