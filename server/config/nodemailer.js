import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // add this to prevent issues with TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Optional: verify connection
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Email server error:", err);
  } else {
    console.log("✅ Email server is ready");
  }
});

export default transporter;
