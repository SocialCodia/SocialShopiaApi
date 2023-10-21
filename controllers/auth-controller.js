const authValidation = require('../validations/auth-validation');
const userService = require('../services/user-service');
const otpService = require('../services/otp-service');
const mailService = require('../services/mail-service');
const ErrorHandler = require('../utils/error-handler');
const Constants = require('../utils/constants');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const { OAuth2Client } = require('google-auth-library');
const googleClientId = process.env.GOOGLE_CLIENT_ID;
class AuthController {

    register = async (req, res, next) => {
        const body = await authValidation.register.validateAsync(req.body);
        const { name, email } = body;
        const data = await userService.createUser(body);
        if (!data) return next(ErrorHandler.serverError('Failed To Create An Account'));
        const otp = otpService.generateOtp();
        await otpService.storeOtp(data._id, Constants.OTP_TYPE_VERIFY_EMAIL, otp);
        const isSent = await mailService.sendVerificationMail(name, email, otp);
        return isSent ? res.json({ success: true, message: 'Verification Email Has Been Sent' }) : next(ErrorHandler.serverError('Failed To Verification Email'));
    }

    verify = async (req, res, next) => {
        const body = await authValidation.verify.validateAsync(req.body);
        const user = await userService.findUser({ email: body.email });
        if (!user)
            return next(ErrorHandler.notFound('No User Found'));
        // if (user.status == Constants.USER_STATUS_BANNED)
        //     return next(ErrorHandler.notAllowed('Your Account Has Been Banned'));
        if (user.status != Constants.USER_STATUS_UNVERIFIED)
            return next(ErrorHandler.badRequest('Email Already Verified'));
        const result = await otpService.verifyOtp(user._id, body.otp);
        if (result == Constants.OTP_INVALID)
            return next(ErrorHandler.badRequest('Invalid OTP'));
        const isVerified = userService.updateUser(user._id, { status: Constants.USER_STATUS_VERIFIED });
        return isVerified ? res.json({ success: true, message: 'Email Has Been Verified' }) : next(ErrorHandler.serverError('Failed To Verify Email'));
    }

    login = async (req, res, next) => {
        const body = await authValidation.login.validateAsync(req.body);
        const user = await userService.findUser({ email: body.email });
        if (!user)
            return next(ErrorHandler.notFound("No User Found"));
        const isValidPassword = await userService.verifyPassword(body.password, user.password);
        if (!isValidPassword)
            return next(ErrorHandler.unAuthorized('Invalid Password'));
        if (user.status == Constants.USER_STATUS_BANNED)
            return next(ErrorHandler.notAllowed('Your Account Has Been Banned'));
        if (user.status == Constants.USER_STATUS_UNVERIFIED)
            return next(ErrorHandler.notAllowed('Email Verification Pending'));
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            type: user.type
        }
        const { accessToken, refreshToken } = tokenService.generateToken(payload);
        await tokenService.storeRefreshToken(user._id, refreshToken);
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30
        });

        const data = new UserDto(user);
        data.accessToken = accessToken;
        data.refreshToken = refreshToken;
        res.json({ success: true, message: 'Login Successfull', data });
    }

    forgot = async (req, res, next) => {
        const body = await authValidation.forgot.validateAsync(req.body);
        const user = await userService.findUser({ email: body.email });
        if (!user)
            return next(ErrorHandler.notFound('User Not Found'));
        if (user.status == Constants.USER_STATUS_BANNED)
            return next(ErrorHandler.notAllowed('Your Account Has Been Banned'));
        if (user.status == Constants.USER_STATUS_UNVERIFIED)
            return next(ErrorHandler.notAllowed('Email Verification Pending'));
        const otp = otpService.generateOtp();
        await otpService.storeOtp(user._id, Constants.OTP_TYPE_FORGOT_PASSWORD, otp,);
        const isEmailSent = await mailService.sendForgotPasswordMail(user.name, user.email, otp);
        return isEmailSent ? res.json({ success: true, message: 'Password has been Reset Successfully' }) : next(ErrorHandler.serverError('Failed to send an OTP'));
    }

    reset = async (req, res, next) => {
        const body = await authValidation.reset.validateAsync(req.body);
        const user = await userService.findUser({ email: body.email });
        if (!user)
            return next(ErrorHandler.notFound('User Not Found'));
        if (user.status == Constants.USER_STATUS_BANNED)
            return next(ErrorHandler.notAllowed('Your Account Has Been Banned'));
        if (user.status == Constants.USER_STATUS_UNVERIFIED)
            return next(ErrorHandler.notAllowed('Email Verification Pending'));
        const otpRes = await otpService.verifyOtp(user._id, body.otp, Constants.OTP_TYPE_FORGOT_PASSWORD);
        if (otpRes == Constants.OTP_INVALID)
            return next(ErrorHandler.badRequest('Invalid OTP'));
        if (otpRes == Constants.OTP_EXPIRED)
            return next(ErrorHandler.badRequest('OTP Expired'));
        const isUpdated = await userService.updateUser(user._id, { password: body.password });
        return isUpdated ? res.json({ success: true, message: 'Password has been Reset Successfully' }) : next(ErrorHandler.serverError('Failed to Reset Password'));
    }

    logout = async (req, res, next) => {
        await tokenService.removeRefreshToken(req.user.id,);
        return next(ErrorHandler.responseSuccess('Logout Successfully'));
    }

    logoutAll = async (req, res, next) => {
        await tokenService.removeRefreshToken(req.user.id,);
        res.json({ success: true, message: 'Logout Successfully' })
    }

    refresh = async (req, res, next) => {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        if (!refreshTokenFromCookie) return next(ErrorHandler.unAuthorized());
        const userData = tokenService.verifyRefreshToken(refreshTokenFromCookie);
        const { id, email, username, type } = userData;
        const token = await tokenService.findRefreshToken(id, refreshTokenFromCookie);
        if (!token) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json({ success: false, message: 'Unauthorized Access' })
        }
        const user = await userService.findUser({ email });
        if (user.status != 'banned') return next(ErrorHandler.unAuthorized('Your Account Has Been Banned'));
        const payload = {
            id,
            email,
            username,
            type
        }
        const { accessToken, refreshToken } = tokenService.generateToken(payload);
        await tokenService.updateRefreshToken(_id, refreshTokenFromCookie, refreshToken);
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.json({ success: true, message: 'Secure access has been granted', user: new UserDto(user) })
    }

    google = async (req, res, next) => {
        const client = new OAuth2Client("GOOGLE_CLIENT_ID");
        const { tokenId } = req.body;
        if (!tokenId) return next(ErrorHandler.badRequest());
        const resp = await client.verifyIdToken({ idToken: tokenId, audience: googleClientId });
        if (resp.payload) {
            const { name, email, picture: image } = resp.payload;
            let user = await userService.findUser({ email });
            if (!user) {
                user = await userService.createUser({ name, email, image, status: Constants.USER_STATUS_VERIFIED })
            }
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                type: user.type
            }
            const { accessToken, refreshToken } = tokenService.generateToken(payload);
            await tokenService.storeRefreshToken(user._id, refreshToken);
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            res.json({ success: true, message: 'Login Successfull', user: new UserDto(user) })
        }
        else
            return next(ErrorHandler.serverError('Failed To Login'));
    }

    facebook = async (req, res, next) => {
        const body = await authValidation.facebook.validateAsync(req.body);
        const facebookUrl = `https://graph.facebook.com/v2.11/${userId}/?field=id,name,email&access_token=${accessToken}`;
        const facebook = await fetch(facebookUrl, { method: 'GET' })
        if (!facebook) return next(ErrorHandler.badRequest('Failed To Login'));
        const { name, email } = facebook;
        let user = await userService.findUser({ email });
        if (!user) {
            user = await userService.createUser({ name, email, status: Constants.USER_STATUS_VERIFIED })
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            type: user.type
        }
        const { accessToken, refreshToken } = tokenService.generateToken(payload);
        await tokenService.storeRefreshToken(user._id, refreshToken);
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.json({ success: true, message: 'Login Successfull', user: new UserDto(user) })
    }

}

module.exports = new AuthController();