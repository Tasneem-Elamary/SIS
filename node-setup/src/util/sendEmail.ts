import nodemailer from 'nodemailer';
import Env from '../../config/env.config';

export const sendEmail = async (to:string, subject:string, text:string):Promise<void> => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // enforcing secure transfer
    auth: {
      user: Env.ADMIN_EMAIL,
      pass: Env.ADMIN_PASS,
    },
  });

  // Set up email data
  const mailOptions = {
    from: 'SD241204@debi.eui.edu.eg',
    to,
    subject,
    text,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
};
