const transport = require('../configs/mail-config');
const mailTemplate = require('../templates/mail-template');
class MailService {

    sendVerificationMail = async (name, to, otp) => {
        const { subject, body } = mailTemplate.templateVerificationPassword(name, otp);
        return await this.sendMail(to, subject, body);
    }

    sendForgotPasswordMail = async (name, email, otp) => {
        const { subject, body } = mailTemplate.templateForgotPassword(name, otp);
        return await this.sendMail(email, subject, body);
    }

    sendMail = async (to, subject, body) => {
        const mailOption = {
            from: process.env.SMTP_AUTH_USER,
            to,
            subject,
            text: body
        }
        return await transport.sendMail(mailOption);
    }

}

module.exports = new MailService();