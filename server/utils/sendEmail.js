import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporterOptions = {
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  if (process.env.EMAIL_SERVICE) {
    transporterOptions.service = process.env.EMAIL_SERVICE;
  } else {
    transporterOptions.host = process.env.EMAIL_HOST;
    transporterOptions.port = process.env.EMAIL_PORT;
    transporterOptions.secure = process.env.EMAIL_PORT == 465;
  }

  const transporter = nodemailer.createTransport(transporterOptions);

  const message = {
    from: `${process.env.FROM_NAME || 'HashNode'} <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;