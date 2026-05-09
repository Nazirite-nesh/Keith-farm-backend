const nodemailer = require("nodemailer");
const AfricasTalking = require("africastalking");

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = at.SMS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sendEmail = async (subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ALERT_EMAIL,
      subject: `🌿 King Nazirite Farm Alert: ${subject}`,
      html: `
        <div style="font-family:Arial;padding:20px;background:#f4f6f8">
          <div style="background:#2e7d32;padding:15px;border-radius:10px;text-align:center">
            <h2 style="color:#ffd700;margin:0">King Nazirite Nesh Farm</h2>
            <p style="color:white;margin:5px 0">Farm Management System</p>
          </div>
          <div style="background:white;padding:20px;border-radius:10px;margin-top:15px">
            <h3 style="color:#2e7d32">${subject}</h3>
            <p>${message}</p>
            <hr/>
            <p style="color:#555;font-size:12px">This is an automated alert from your farm management system.</p>
          </div>
        </div>
      `
    });
    console.log("Email sent:", subject);
  } catch (err) {
    console.log("Email error:", err.message);
  }
};

const sendSMS = async (message) => {
  try {
    await sms.send({
      to: [process.env.ALERT_PHONE],
      message: `King Nazirite Farm Alert: ${message}`
    });
    console.log("SMS sent");
  } catch (err) {
    console.log("SMS error:", err.message);
  }
};

const sendAlert = async (subject, message) => {
  await Promise.all([
    sendEmail(subject, message),
    sendSMS(`${subject} - ${message}`)
  ]);
};

module.exports = { sendAlert, sendEmail, sendSMS };
