import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'hotmail', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // your app password (not your main email password)
      }
    });

    const mailOptions = {
      from: `"YourApp 👋" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { sendEmail };
