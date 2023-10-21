const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    requireTLS: process.env.SMTP_TLS,
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_PASSWORD
    }
});


module.exports = transport;