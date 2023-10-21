const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');
const ErrorHandler = require('../utils/error-handler');
const userValidation = require('../validations/user-validation');
const Constants = require('../utils/constants');

class UserController {

    findUser = async (req, res, next) => {
        let { id } = req.user;
        if (req.user.type == 'admin' && req.params.id != null)
            id = req.params.id;
        const user = await userService.findUser({ _id: id });
        if (!user)
            return next(ErrorHandler.notFound(Constants.MESSAGE_USER_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_USER_FOUND, data: new UserDto(user) });
    }

    findUsers = async (req, res, next) => {
        const type = req.path.split('/').pop().slice(0, -1).toLowerCase();
        const users = await userService.findUsers({ type });
        if (!users)
            return next(ErrorHandler.notFound(Constants.MESSAGE_USER_NOT_FOUND));
        const data = users.map((x) => new UserDto(x));
        res.json({ success: true, message: Constants.MESSAGE_USER_FOUND, data });
    }

    updateUser = async (req, res, next) => {
        let { id } = req.user;
        const file = req.file;
        const body = await userValidation.updateUser.validateAsync(req.body);
        if (req.user.type == 'admin' && body.id != null) {
            id = body.id;
        }
        else {
            delete body.id;
            delete body.status;
        }
        body.image = file && file.filename;
        const user = await userService.findUserAndUpdate({ _id: id }, body);
        if (!user)
            return next(ErrorHandler.notFound(Constants.MESSAGE_USER_NOT_FOUND));
        res.json({ success: true, message: Constants.MESSAGE_ACCOUNT_UPDATE });
    }

}

module.exports = new UserController();