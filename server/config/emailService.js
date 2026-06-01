// import http from 'http';
// import nodemailer from 'nodemailer';
 

// // Configure the SMTP transporter
// const transporter = nodemailer.createTransport({
//   // host: 'smtp.gmail.com', // e.g., 'smtp.gmail.com' for Gmail
//   // port: 465, // or 465 for secure
//   // secure: true, // true for port 465, false for other ports
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL, // your SMTP username
//     pass: process.env.EMAIL_PASS,    // your SMTP password
//   },
//   tls:{
//     rejectUnathorized: false
//   }
// });

// // Function to send email
// async function sendEmail(to, subject, text, html) {
//   try {
   
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL, // sender address
//       to, // list of receivers
//       subject, // Subject line
//       text, // plain text body
//       html, // html body
//     });
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return { success: false, error: error.message };
//   }
// }

// export {sendEmail};

import { Resend } from 'resend';

// Initialize Resend with API Key jo aapne Render environment me dali hai
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send email
async function sendEmail(to, subject, text, html) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Isko hamesha yahi rehne dena free tier me
      to: to,
      subject: subject,
      html: html || text,
    });

    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return { success: false, error: error.message };
  }
}

export { sendEmail };