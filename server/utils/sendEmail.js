import { Resend } from 'resend';

const sendEmail = async (options) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const message = {
    from: `${process.env.FROM_NAME || 'HashNode'} <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const data = await resend.emails.send(message);
    console.log('Message sent: %s', data.id);
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    throw new Error('Email could not be sent to ' + options.email);
  }
};

export default sendEmail;