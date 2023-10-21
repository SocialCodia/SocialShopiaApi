const crypto = require('crypto');
const OtpModel = require('../models/otp-model');
const Constants = require('../utils/constants');

class OtpService {

    generateOtp = () => crypto.randomInt(100000, 999999);

    storeOtp = async (userId, type, otp) => {
        await this.removeOtp(userId);
        return await OtpModel.create({ userId, type, otp });
    }

    removeOtp = async (userId) => await OtpModel.deleteOne({ userId });

    verifyOtp = async (userId, otp, type = otpType) => {
        let otps = await OtpModel.findOne({ userId, type, otp });
        if (otps) {
            await this.removeOtp(userId);
            return Constants.OTP_VALID;
        }
        else
            return Constants.OTP_INVALID;
    }

}



module.exports = new OtpService();  