const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {

    createUser = async user => await UserModel.create(user);

    updateUser = async (_id, user) => await UserModel.updateOne({ _id }, user);

    findUser = async filter => await UserModel.findOne(filter);

    findUserAndUpdate = async (filter, data) => await UserModel.findOneAndUpdate(filter, data);

    findUsers = async filter => await UserModel.find(filter);

    verifyPassword = async (password, hashPassword) => await bcrypt.compare(password, hashPassword);

}

module.exports = new UserService();