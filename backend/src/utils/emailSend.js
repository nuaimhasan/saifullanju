const nodemailer = require("nodemailer");

const backendURL = process.env.BACKEND_URL;
const frontendURL = process.env.FRONTEND_URL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nuaim.emanager@gmail.com",
    pass: "jdhu ocil dkar agzg",
  },
});

exports.emailSend = async (userMail, token) => {
  await transporter.sendMail({
    from: "Saiful Lanju", // sender address
    to: userMail, // list of receivers
    subject: "Password Recover", // Subject line
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h1 style="color: #333;">Reset Your Password</h1>
    <p style="color: #555; line-height: 1.5;">
      Thank you for being with us! To recover your password, please click the button below.
    </p>
    <p style="text-align: center;">
      <a href="${frontendURL}/forgotPassword/setNewPassword?token=${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">
        Reset Password
      </a>
    </p>
    <p style="color: #555; line-height: 1.5;">
      If you did not requested for password reset, please ignore this email.
    </p>
    <p style="color: #555; line-height: 1.5;">
      Best regards,<br>
      Saiful Lanju
    </p>
  </div>`, // html body
  });
};

exports.verifyEmailSend = async (userMail, token, userName) => {
  await transporter.sendMail({
    from: "Saiful Lanju",
    to: userMail,
    subject: "Verify Your Email",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h1 style="color: #333;">Hello ${userName}</h1>
    <p style="color: #555; line-height: 1.5;">
      Thank you for signing up on Saiful Lanju! To complete your registration and verify your email address, please click the button below.
    </p>
    <p style="text-align: center;">
      <a href="${backendURL}/api/user/verify/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">
        Verify Email
      </a>
    </p>
    <p style="color: #555; line-height: 1.5;">
      If you did not create an account, please ignore this email.
    </p>
    <p style="color: #555; line-height: 1.5;">
      Best regards,<br>
      Saiful Lanju
    </p>
  </div>`,
  });
};

exports.sendTrainingTicket = async (userMail, userName, training, order) => {
  await transporter.sendMail({
    from: "Saiful Lanju",
    to: userMail,
    subject: `Order Confirmation for ${training?.title}`,
    html: `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #333; font-size: 23px; margin: 0;">Congratulations</h1>
        <h1 style="color: #333; font-size: 23px; margin: 0;">Your order has been placed successfully</h1>
    </div>
    <div style="color: #555; line-height: 1.6; font-size: 16px;">
        <p>Dear <span style="font-weight: bold;">${userName}</span>,</p>
        <p>Thank you for your order! We are pleased to confirm your registration for the training program. Your order has been successfully processed, and your training ticket is ready to be downloaded.</p>
        
        <p><strong>Order Details:</strong></p>
        <ul>
            <li><strong>Training Program:</strong> ${training?.title}</li>
            <li><strong>Ticket Number:</strong> ${order?.ticketNumber}</li>
            <li><strong>Payment Amount:</strong> ৳${order?.paymentAmount}</li>
            <li><strong>Order Date:</strong> ${training?.startDate}</li>
            <li><strong>Order Address:</strong> ${training?.address}</li>
        </ul>
        
        <p>You can download your ticket by clicking the button below:</p>
        
        <a href="${process.env.FRONTEND_URL}/training/download-ticket/${order?._id}" style="display: inline-block; background-color: #0B504F; color: white; padding: 10px 20px; font-size: 16px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Download Your Ticket</a>
        
        <p style="margin-top: 20px;">If you have any questions or need further assistance, feel free to reach out to us.</p>
        
        <p style="margin-top: 20px;">If you did not place this order, please disregard this email.</p>
    </div>
    <div style="margin-top: 20px; font-size: 14px; color: #777;">
        <p>Best regards, <br> Saiful Lanju</p>
    </div>
</div>
`,
  });
};
