const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {

    generateToken = payload => {
        const accessToken = jwt.sign(payload, process.env.KEY_ACCESS_TOKEN, {
            expiresIn: '1y'
        });
        const refreshToken = jwt.sign(payload, process.env.KEY_REFRESH_TOKEN, {
            expiresIn: '1y'
        });
        return { accessToken, refreshToken };
    }

    storeRefreshToken = async (userId, token) => {
        const tokens = { token: token };
        const isExist = await TokenModel.exists({ userId });
        if (!isExist)
            return await TokenModel.create({ userId, tokens });
        else
            return await TokenModel.findOneAndUpdate({ userId }, { $push: { tokens } });
    }

    verifyAccessToken = token => jwt.verify(token, process.env.KEY_ACCESS_TOKEN);

    verifyRefreshToken = token => jwt.verify(token, process.env.KEY_REFRESH_TOKEN);

    findRefreshToken = async (userId, token) => await TokenModel.findOne({ userId, 'tokens.token': token }).select({ tokens: { $elemMatch: { token } } });

    updateAccessToken = async (userId, oldToken, token) => await TokenModel.findOneAndUpdate({ userId, 'tokens.token': oldToken }, { $set: { 'tokens.$.token': token } });

    removeRefreshToken = async (userId, token) => {
        const tokens = { token };
        await TokenModel.updateOne({ userId, 'tokens.token': token }, { $pull: { tokens } });
    }

    removeRefreshTokens = async userId => await TokenModel.deleteOne({ userId });

}

module.exports = new TokenService();