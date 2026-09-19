// import { Resend } from "resend";

import nodemailer from "nodemailer";

export  const sendEmail = async ({ to, subject, html }) => {
  try {
    const user = process.env.SMTP_EMAIL;
    const pass = process.env.SMTP_PASSWORD?.replace(/\s/g, "");

    if (!user || !pass) {
      throw new Error("SMTP_EMAIL and SMTP_PASSWORD are required");
    }
  
    // Create transporter
    const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
      auth: {
        user, // sender email
        pass, // Gmail App Password
      },
    });

    // Mail options
    const mailOptions = {
      from: `"FloralPallete" <${user}>`,
      to,
      subject,
      html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

// export default sendEmail;

