const ModelState = require('../models/state-model');

class StateService {

    createState = async data => await ModelState.create(data);

    findStates = async filter => await ModelState.find(filter);

    findState = async filter => await ModelState.findOne(filter);

    updateState = async (filter, data) => await ModelState.updateOne(filter, data);

    deleteState = async filter => await ModelState.deleteOne(filter);

};

module.exports = new StateService();