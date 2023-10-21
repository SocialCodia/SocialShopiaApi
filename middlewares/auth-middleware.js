const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const ErrorHandler = require('../utils/error-handler');
const { TokenExpiredError } = require('jsonwebtoken');
const { updateAccessToken } = require('../services/token-service');
const Constants = require('../utils/constants');

const auth = async (req, res, next) => {
    const { accessToken: accessTokenFromCookie, refreshToken: refreshTokenFromCookie } = req.cookies;

    try {
        const tokenUser = tokenService.verifyAccessToken(accessTokenFromCookie);
        if (!tokenUser)
            return next(ErrorHandler.unAuthorized());
        req.user = tokenUser;
    }
    catch (e) {
        if (e instanceof TokenExpiredError) {
            console.log("TOKEN RENEW");
            if (!refreshTokenFromCookie)
                return next(ErrorHandler.unAuthorized());
            const tokenUser = tokenService.verifyRefreshToken(refreshTokenFromCookie);
            if (!tokenUser)
                return next(ErrorHandler.unAuthorized());
            const token = await tokenService.findRefreshToken(tokenUser.id, refreshTokenFromCookie);
            if (!token)
                return next(ErrorHandler.unAuthorized());
            delete tokenUser.exp;
            delete tokenUser.iat;
            const { accessToken, refreshToken } = tokenService.generateToken(tokenUser);
            await updateAccessToken(tokenUser.id, refreshTokenFromCookie, refreshToken);
            const user = await userService.findUser({ _id: tokenUser.id });
            if (user.status == Constants.USER_STATUS_BANNED)
                return next(ErrorHandler.notAllowed('Your Account Has Been Banned'));
            if (user.status == Constants.USER_STATUS_UNVERIFIED)
                return next(ErrorHandler.notAllowed('Email Verification Pending'));
            req.user = tokenUser;
            req.cookies.accessToken = accessToken;
            req.cookies.refreshToken = refreshToken;
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
        }
        else
            return next(ErrorHandler.unAuthorized());
    }

    return next();
}

const authRole = (role) => {
    return (req, res, next) => {
        if (req.user.type != role)
            return next(ErrorHandler.notAllowed());
        next();
    }
}


module.exports = { auth, authRole };