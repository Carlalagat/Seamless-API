const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/?token=${token}`;

    await this.transporter.sendMail({
      from: `SeamLess App <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify Your SeamLess Account",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .container { background-color: #f4f4f4; padding: 20px; border-radius: 8px; }
            .header { background-color: #7E3FFF; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: white; padding: 20px; border-radius: 0 0 8px 8px; }
            .btn { display: inline-block; background-color: #7E3FFF; color: white; padding: 10px 20px; 
                   text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your SeamLess Account</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You're almost ready to get started with SeamLess! Click the button below to verify your email address.</p>
              <a href="${verificationUrl}" class="btn">Verify Account</a>
              <p>If the button doesn't work, copy and paste this link in your browser:</p>
              <p>${verificationUrl}</p>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 SeamLess. All rights reserved.</p>
              <p>This is an automated message. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Verify Your SeamLess Account

Hello,

You're almost ready to get started with SeamLess! Click the link below to verify your email address:

${verificationUrl}

This link will expire in 1 hour.

If you didn't create an account, please ignore this email.

© 2025 SeamLess. All rights reserved.
This is an automated message. Please do not reply.`,
    });
  }

  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `SeamLess App <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset Your SeamLess Password",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .container { background-color: #f4f4f4; padding: 20px; border-radius: 8px; }
            .header { background-color: #7E3FFF; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: white; padding: 20px; border-radius: 0 0 8px 8px; }
            .btn { display: inline-block; background-color: #7E3FFF; color: white; padding: 10px 20px; 
                   text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You have requested to reset your password for your SeamLess account. Click the button below to proceed.</p>
              <a href="${resetUrl}" class="btn">Reset Password</a>
              <p>If the button doesn't work, copy and paste this link in your browser:</p>
              <p>${resetUrl}</p>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request a password reset, please ignore this email or contact support if you're concerned.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 SeamLess. All rights reserved.</p>
              <p>This is an automated message. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Reset Your SeamLess Password

Hello,

You have requested to reset your password for your SeamLess account. Click the link below to proceed:

${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email or contact support if you're concerned.

© 2025 SeamLess. All rights reserved.
This is an automated message. Please do not reply.`,
    });
  }
}

module.exports = new EmailService();
