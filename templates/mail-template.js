
class MailTemplate {

    templateVerificationPassword = (name, otp) => {
        const subject = `Verify Your ${process.env.APP_NAME} Account`;
        const body = `Hi ${name}\nUse this OTP (One Time Passsword) to verify your account ${otp}`;
        return { subject, body };
    }

    templateForgotPassword = (name, otp) => {
        const subject = `Reset Your ${process.env.APP_NAME} Account`;
        const body = `Hi ${name}\nUse this OTP (One Time Passsword) to Reset your Password ${otp}`;
        return { subject, body };
    }

}


module.exports = new MailTemplate();