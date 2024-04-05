const nodemailer = require('nodemailer');

const sendEmail = async (emailOptions) => {
  let transporter = nodemailer.createTransport({
    host: 'your_smtp_server',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your_email_username',
      pass: 'your_email_password'
    }
  });

  await transporter.sendMail(emailOptions);
};
