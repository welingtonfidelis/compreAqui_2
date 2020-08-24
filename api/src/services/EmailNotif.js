const sgMail = require('@sendgrid/mail');
const URL_FRONT = process.env.URL_FRONT;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

module.exports = {
    async sendOneEmail(email, subject, msg) {
        try {
            sgMail.setApiKey(SENDGRID_API_KEY);
            sgMail.send({
                to: email,
                from: 'compreaqui@email.com',
                subject,
                html: msg,
            });

        } catch (error) {
            console.war(
                'ERRO NO ENVIO DE EMAIL UNICO',
                (error.stack || error.message || error)
            );
        }
    }
}