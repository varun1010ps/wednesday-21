const sgMail = require('@sendgrid/mail');
const keys = require('../config/key.js')

sgMail.setApiKey(keys.sendAPIkey);

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { sendEmail };